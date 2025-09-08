import { RequestHandler } from "express";
import { AuthRequest, OTPVerificationRequest, AuthResponse, User } from "@shared/api";

// Enhanced user storage with database-like structure
interface UserRecord extends User {
  password?: string;
  aadharNumber?: string;
  dlNumber?: string;
  aadharVerified: boolean;
  dlVerified: boolean;
  googleId?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
}

// Mock database storage
const userDatabase: UserRecord[] = [];
const otpStorage: { [key: string]: { otp: string; expires: number } } = {};
const aadharOtpStorage: { [key: string]: { otp: string; expires: number } } = {};
const dlOtpStorage: { [key: string]: { otp: string; expires: number } } = {};

// Generate random OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Hash password (in production, use bcrypt)
const hashPassword = (password: string): string => {
  return Buffer.from(password).toString('base64');
};

// Verify password
const verifyPassword = (password: string, hash: string): boolean => {
  return Buffer.from(password).toString('base64') === hash;
};

// Email/Password Login
export const loginWithEmail: RequestHandler = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    } as AuthResponse);
  }

  const user = userDatabase.find(u => u.email === email);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Account not found. Please create an account first."
    } as AuthResponse);
  }

  if (!user.password || !verifyPassword(password, user.password)) {
    return res.status(401).json({
      success: false,
      message: "Invalid password"
    } as AuthResponse);
  }

  // Generate token
  const token = Buffer.from(`${user.id}:${email}:${Date.now()}`).toString('base64');

  // Remove sensitive data from response
  const { password: _, ...userResponse } = user;

  res.json({
    success: true,
    message: "Login successful",
    user: userResponse,
    token
  } as AuthResponse);
};

// Complete Signup with verification
export const completeSignup: RequestHandler = (req, res) => {
  const { 
    firstName, lastName, email, phone, password, 
    dateOfBirth, gender, aadharNumber, dlNumber 
  } = req.body;

  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be filled"
    } as AuthResponse);
  }

  // Check if user already exists
  const existingUser = userDatabase.find(u => u.email === email || u.phone === phone);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "User already exists with this email or phone"
    } as AuthResponse);
  }

  // Create new user
  const newUser: UserRecord = {
    id: userDatabase.length + 1,
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    email,
    phone,
    password: hashPassword(password),
    dateOfBirth,
    gender,
    aadharNumber,
    dlNumber,
    verified: true,
    aadharVerified: true,
    dlVerified: true,
    createdAt: new Date().toISOString()
  };

  userDatabase.push(newUser);

  // Generate token
  const token = Buffer.from(`${newUser.id}:${email}:${Date.now()}`).toString('base64');

  // Remove sensitive data from response
  const { password: _, ...userResponse } = newUser;

  res.json({
    success: true,
    message: "Account created successfully",
    user: userResponse,
    token
  } as AuthResponse);
};

// Aadhar Verification
export const verifyAadhar: RequestHandler = (req, res) => {
  const { aadharNumber } = req.body;

  if (!aadharNumber || aadharNumber.length !== 12) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid 12-digit Aadhar number"
    });
  }

  const otp = generateOTP();
  const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

  aadharOtpStorage[aadharNumber] = { otp, expires };

  // In production, integrate with UIDAI API
  console.log(`Aadhar OTP for ${aadharNumber}: ${otp}`);

  res.json({
    success: true,
    message: "OTP sent to registered mobile number",
    otp // Remove in production
  });
};

export const verifyAadharOTP: RequestHandler = (req, res) => {
  const { aadharNumber, otp } = req.body;

  if (!aadharNumber || !otp) {
    return res.status(400).json({
      success: false,
      message: "Aadhar number and OTP are required"
    });
  }

  const storedOTP = aadharOtpStorage[aadharNumber];
  
  if (!storedOTP) {
    return res.status(400).json({
      success: false,
      message: "OTP not found. Please request a new OTP."
    });
  }

  if (Date.now() > storedOTP.expires) {
    delete aadharOtpStorage[aadharNumber];
    return res.status(400).json({
      success: false,
      message: "OTP has expired. Please request a new OTP."
    });
  }

  if (storedOTP.otp !== otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP. Please try again."
    });
  }

  delete aadharOtpStorage[aadharNumber];

  res.json({
    success: true,
    message: "Aadhar verified successfully"
  });
};

// Driving License Verification
export const verifyDL: RequestHandler = (req, res) => {
  const { dlNumber } = req.body;

  if (!dlNumber || dlNumber.length < 10) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid driving license number"
    });
  }

  const otp = generateOTP();
  const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

  dlOtpStorage[dlNumber] = { otp, expires };

  // In production, integrate with RTO API
  console.log(`DL OTP for ${dlNumber}: ${otp}`);

  res.json({
    success: true,
    message: "OTP sent to registered mobile number",
    otp // Remove in production
  });
};

export const verifyDLOTP: RequestHandler = (req, res) => {
  const { dlNumber, otp } = req.body;

  if (!dlNumber || !otp) {
    return res.status(400).json({
      success: false,
      message: "Driving license number and OTP are required"
    });
  }

  const storedOTP = dlOtpStorage[dlNumber];
  
  if (!storedOTP) {
    return res.status(400).json({
      success: false,
      message: "OTP not found. Please request a new OTP."
    });
  }

  if (Date.now() > storedOTP.expires) {
    delete dlOtpStorage[dlNumber];
    return res.status(400).json({
      success: false,
      message: "OTP has expired. Please request a new OTP."
    });
  }

  if (storedOTP.otp !== otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP. Please try again."
    });
  }

  delete dlOtpStorage[dlNumber];

  res.json({
    success: true,
    message: "Driving license verified successfully"
  });
};

// Google OAuth handlers (placeholder)
export const googleAuth: RequestHandler = (req, res) => {
  // In production, implement Google OAuth flow
  res.redirect(`https://accounts.google.com/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile`);
};

export const googleCallback: RequestHandler = (req, res) => {
  // In production, handle Google OAuth callback
  const { code } = req.query;
  
  // Mock Google user data
  const googleUser = {
    id: userDatabase.length + 1,
    name: "Google User",
    email: "user@gmail.com",
    phone: "",
    verified: true,
    aadharVerified: false,
    dlVerified: false,
    googleId: "google_user_id",
    createdAt: new Date().toISOString()
  };

  userDatabase.push(googleUser);
  
  const token = Buffer.from(`${googleUser.id}:${googleUser.email}:${Date.now()}`).toString('base64');
  
  // Redirect to frontend with token
  res.redirect(`/?token=${token}&user=${encodeURIComponent(JSON.stringify(googleUser))}`);
};

// Legacy phone OTP methods (keeping for compatibility)
export const requestOTP: RequestHandler = (req, res) => {
  const { phone }: AuthRequest = req.body;

  if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid 10-digit Indian mobile number"
    } as AuthResponse);
  }

  const otp = generateOTP();
  const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

  otpStorage[phone] = { otp, expires };

  console.log(`OTP for ${phone}: ${otp}`);

  res.json({
    success: true,
    message: `OTP sent to ${phone}. For demo purposes, OTP is: ${otp}`
  } as AuthResponse);
};

export const verifyOTP: RequestHandler = (req, res) => {
  const { phone, otp }: OTPVerificationRequest = req.body;

  if (!phone || !otp) {
    return res.status(400).json({
      success: false,
      message: "Phone number and OTP are required"
    } as AuthResponse);
  }

  const storedOTP = otpStorage[phone];
  
  if (!storedOTP) {
    return res.status(400).json({
      success: false,
      message: "OTP not found. Please request a new OTP."
    } as AuthResponse);
  }

  if (Date.now() > storedOTP.expires) {
    delete otpStorage[phone];
    return res.status(400).json({
      success: false,
      message: "OTP has expired. Please request a new OTP."
    } as AuthResponse);
  }

  if (storedOTP.otp !== otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP. Please try again."
    } as AuthResponse);
  }

  delete otpStorage[phone];

  let user = userDatabase.find(u => u.phone === phone);
  
  if (!user) {
    user = {
      id: userDatabase.length + 1,
      name: `User ${phone}`,
      email: "",
      phone,
      verified: true,
      aadharVerified: false,
      dlVerified: false,
      createdAt: new Date().toISOString()
    };
    userDatabase.push(user);
  } else {
    user.verified = true;
  }

  const token = Buffer.from(`${user.id}:${phone}:${Date.now()}`).toString('base64');

  res.json({
    success: true,
    message: "Phone number verified successfully",
    user,
    token
  } as AuthResponse);
};

export const getUserProfile: RequestHandler = (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: "Authorization token required"
    });
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [userId] = decoded.split(':');
    
    const user = userDatabase.find(u => u.id === parseInt(userId));
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    // Remove sensitive data
    const { password, ...userResponse } = user;

    res.json({
      success: true,
      user: userResponse
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

export const updateProfile: RequestHandler = (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: "Authorization token required"
    });
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [userId] = decoded.split(':');
    
    const user = userDatabase.find(u => u.id === parseInt(userId));
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    const { name, email, phone } = req.body;
    
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    // Remove sensitive data
    const { password, ...userResponse } = user;

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: userResponse
    } as AuthResponse);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

// Get all users (admin endpoint)
export const getAllUsers: RequestHandler = (req, res) => {
  const usersWithoutPasswords = userDatabase.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

  res.json({
    success: true,
    users: usersWithoutPasswords,
    total: usersWithoutPasswords.length
  });
};
