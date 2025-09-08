import path from "path";
import "dotenv/config";
import * as express from "express";
import express__default from "express";
import cors from "cors";
const handleDemo = (req, res) => {
  const response = {
    message: "Hello from Express server"
  };
  res.status(200).json(response);
};
const mockBikes = [
  {
    id: 1,
    name: "Royal Enfield Classic 350",
    location: "Mumbai",
    price: 1e3,
    rating: 4.8,
    image: "https://cdn.builder.io/api/v1/image/assets%2F51218e8445d94a61bcf324c702b7ca69%2F2bb6b62497af4e0480a47e1815233ea4",
    features: ["350cc", "Manual", "Petrol"],
    available: true,
    type: "Cruiser",
    brand: "Royal Enfield",
    description: "Experience the classic charm of Royal Enfield with modern reliability.",
    specifications: {
      engine: "346cc Single Cylinder",
      mileage: "41 km/l",
      fuelCapacity: "13.5 L",
      weight: "195 kg"
    }
  },
  {
    id: 2,
    name: "Honda Activa 6G",
    location: "Delhi",
    price: 500,
    rating: 4.6,
    image: "https://cdn.builder.io/api/v1/image/assets%2F51218e8445d94a61bcf324c702b7ca69%2Fce42bd7c282447599b4b8037f27383e7",
    features: ["110cc", "Automatic", "Petrol"],
    available: true,
    type: "Scooter",
    brand: "Honda",
    description: "Perfect for city commuting with excellent fuel efficiency.",
    specifications: {
      engine: "109.51cc Air Cooled",
      mileage: "60 km/l",
      fuelCapacity: "5.3 L",
      weight: "109 kg"
    }
  },
  {
    id: 3,
    name: "KTM Duke 390",
    location: "Bangalore",
    price: 1200,
    rating: 4.9,
    image: "https://cdn.builder.io/api/v1/image/assets%2F51218e8445d94a61bcf324c702b7ca69%2F3e65d192410c4554b4119cbdae16e131",
    features: ["390cc", "Manual", "Petrol"],
    available: false,
    type: "Sports",
    brand: "KTM",
    description: "Unleash the beast with KTM's performance-oriented street bike.",
    specifications: {
      engine: "373.2cc Single Cylinder",
      mileage: "25 km/l",
      fuelCapacity: "13.4 L",
      weight: "167 kg"
    }
  },
  {
    id: 4,
    name: "Bajaj Pulsar N250",
    location: "Chennai",
    price: 900,
    rating: 4.4,
    image: "https://cdn.builder.io/api/v1/image/assets%2F51218e8445d94a61bcf324c702b7ca69%2Fed592590e9194d03a33a66d59abcd1fc?format=webp",
    features: ["250cc", "Manual", "Petrol"],
    available: true,
    type: "Sports",
    brand: "Bajaj",
    description: "Adventure-ready sports bike with superior performance.",
    specifications: {
      engine: "250cc DTS-i",
      mileage: "35 km/l",
      fuelCapacity: "14 L",
      weight: "162 kg"
    }
  },
  {
    id: 5,
    name: "TVS Jupiter",
    location: "Hyderabad",
    price: 500,
    rating: 4.3,
    image: "https://cdn.builder.io/api/v1/image/assets%2F51218e8445d94a61bcf324c702b7ca69%2F15dc895e731a410aba9ed54cf0c8c332?format=webp",
    features: ["110cc", "Automatic", "Petrol"],
    available: true,
    type: "Scooter",
    brand: "TVS",
    description: "Smooth and comfortable ride for everyday commuting.",
    specifications: {
      engine: "109.7cc CVTi-REVV",
      mileage: "62 km/l",
      fuelCapacity: "6 L",
      weight: "108 kg"
    }
  },
  {
    id: 6,
    name: "Hero Splendor Plus",
    location: "Pune",
    price: 500,
    rating: 4.2,
    image: "https://cdn.builder.io/o/assets%2F51218e8445d94a61bcf324c702b7ca69%2Fec8f6cdb969b421fb156f72297d7b50b?alt=media&token=fa90e95b-934a-4de2-ad57-acd05df1a4a5&apiKey=51218e8445d94a61bcf324c702b7ca69",
    features: ["97cc", "Manual", "Petrol"],
    available: true,
    type: "Commuter",
    brand: "Hero",
    description: "Reliable and economical bike for daily commuting.",
    specifications: {
      engine: "97.2cc Air Cooled",
      mileage: "70 km/l",
      fuelCapacity: "9.5 L",
      weight: "112 kg"
    }
  }
];
const getBikes = (req, res) => {
  const query = req.query;
  let filteredBikes = [...mockBikes];
  if (query.location && query.location !== "all") {
    filteredBikes = filteredBikes.filter(
      (bike) => bike.location.toLowerCase().includes(query.location.toLowerCase())
    );
  }
  if (query.type && query.type !== "all") {
    filteredBikes = filteredBikes.filter((bike) => bike.type === query.type);
  }
  if (query.brand && query.brand !== "all") {
    filteredBikes = filteredBikes.filter((bike) => bike.brand === query.brand);
  }
  if (query.priceMin !== void 0) {
    filteredBikes = filteredBikes.filter((bike) => bike.price >= query.priceMin);
  }
  if (query.priceMax !== void 0) {
    filteredBikes = filteredBikes.filter((bike) => bike.price <= query.priceMax);
  }
  if (query.available !== void 0) {
    filteredBikes = filteredBikes.filter((bike) => bike.available === query.available);
  }
  if (query.sortBy) {
    filteredBikes.sort((a, b) => {
      switch (query.sortBy) {
        case "price":
          return a.price - b.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }
  const response = {
    bikes: filteredBikes,
    total: filteredBikes.length
  };
  res.json(response);
};
const getBikeById = (req, res) => {
  const bikeId = parseInt(req.params.id);
  const bike = mockBikes.find((b) => b.id === bikeId);
  if (!bike) {
    return res.status(404).json({ message: "Bike not found" });
  }
  res.json(bike);
};
const getFeaturedBikes = (req, res) => {
  const featuredBikes = mockBikes.filter((bike) => bike.rating >= 4.5).slice(0, 6);
  res.json(featuredBikes);
};
const userDatabase = [];
const otpStorage = {};
const aadharOtpStorage = {};
const dlOtpStorage = {};
const generateOTP = () => {
  return Math.floor(1e5 + Math.random() * 9e5).toString();
};
const hashPassword = (password) => {
  return Buffer.from(password).toString("base64");
};
const verifyPassword = (password, hash) => {
  return Buffer.from(password).toString("base64") === hash;
};
const loginWithEmail = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }
  const user = userDatabase.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Account not found. Please create an account first."
    });
  }
  if (!user.password || !verifyPassword(password, user.password)) {
    return res.status(401).json({
      success: false,
      message: "Invalid password"
    });
  }
  const token = Buffer.from(`${user.id}:${email}:${Date.now()}`).toString("base64");
  const { password: _, ...userResponse } = user;
  res.json({
    success: true,
    message: "Login successful",
    user: userResponse,
    token
  });
};
const completeSignup = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    dateOfBirth,
    gender,
    aadharNumber,
    dlNumber
  } = req.body;
  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be filled"
    });
  }
  const existingUser = userDatabase.find((u) => u.email === email || u.phone === phone);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "User already exists with this email or phone"
    });
  }
  const newUser = {
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
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  userDatabase.push(newUser);
  const token = Buffer.from(`${newUser.id}:${email}:${Date.now()}`).toString("base64");
  const { password: _, ...userResponse } = newUser;
  res.json({
    success: true,
    message: "Account created successfully",
    user: userResponse,
    token
  });
};
const verifyAadhar = (req, res) => {
  const { aadharNumber } = req.body;
  if (!aadharNumber || aadharNumber.length !== 12) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid 12-digit Aadhar number"
    });
  }
  const otp = generateOTP();
  const expires = Date.now() + 5 * 60 * 1e3;
  aadharOtpStorage[aadharNumber] = { otp, expires };
  console.log(`Aadhar OTP for ${aadharNumber}: ${otp}`);
  res.json({
    success: true,
    message: "OTP sent to registered mobile number",
    otp
    // Remove in production
  });
};
const verifyAadharOTP = (req, res) => {
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
const verifyDL = (req, res) => {
  const { dlNumber } = req.body;
  if (!dlNumber || dlNumber.length < 10) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid driving license number"
    });
  }
  const otp = generateOTP();
  const expires = Date.now() + 5 * 60 * 1e3;
  dlOtpStorage[dlNumber] = { otp, expires };
  console.log(`DL OTP for ${dlNumber}: ${otp}`);
  res.json({
    success: true,
    message: "OTP sent to registered mobile number",
    otp
    // Remove in production
  });
};
const verifyDLOTP = (req, res) => {
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
const googleAuth = (req, res) => {
  res.redirect(`https://accounts.google.com/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile`);
};
const googleCallback = (req, res) => {
  const { code } = req.query;
  const googleUser = {
    id: userDatabase.length + 1,
    name: "Google User",
    email: "user@gmail.com",
    phone: "",
    verified: true,
    aadharVerified: false,
    dlVerified: false,
    googleId: "google_user_id",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  userDatabase.push(googleUser);
  const token = Buffer.from(`${googleUser.id}:${googleUser.email}:${Date.now()}`).toString("base64");
  res.redirect(`/?token=${token}&user=${encodeURIComponent(JSON.stringify(googleUser))}`);
};
const requestOTP = (req, res) => {
  const { phone } = req.body;
  if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid 10-digit Indian mobile number"
    });
  }
  const otp = generateOTP();
  const expires = Date.now() + 5 * 60 * 1e3;
  otpStorage[phone] = { otp, expires };
  console.log(`OTP for ${phone}: ${otp}`);
  res.json({
    success: true,
    message: `OTP sent to ${phone}. For demo purposes, OTP is: ${otp}`
  });
};
const verifyOTP = (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({
      success: false,
      message: "Phone number and OTP are required"
    });
  }
  const storedOTP = otpStorage[phone];
  if (!storedOTP) {
    return res.status(400).json({
      success: false,
      message: "OTP not found. Please request a new OTP."
    });
  }
  if (Date.now() > storedOTP.expires) {
    delete otpStorage[phone];
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
  delete otpStorage[phone];
  let user = userDatabase.find((u) => u.phone === phone);
  if (!user) {
    user = {
      id: userDatabase.length + 1,
      name: `User ${phone}`,
      email: "",
      phone,
      verified: true,
      aadharVerified: false,
      dlVerified: false,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    userDatabase.push(user);
  } else {
    user.verified = true;
  }
  const token = Buffer.from(`${user.id}:${phone}:${Date.now()}`).toString("base64");
  res.json({
    success: true,
    message: "Phone number verified successfully",
    user,
    token
  });
};
const getUserProfile = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token required"
    });
  }
  const token = authHeader.substring(7);
  try {
    const decoded = Buffer.from(token, "base64").toString();
    const [userId] = decoded.split(":");
    const user = userDatabase.find((u) => u.id === parseInt(userId));
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }
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
const updateProfile = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token required"
    });
  }
  const token = authHeader.substring(7);
  try {
    const decoded = Buffer.from(token, "base64").toString();
    const [userId] = decoded.split(":");
    const user = userDatabase.find((u) => u.id === parseInt(userId));
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
    const { password, ...userResponse } = user;
    res.json({
      success: true,
      message: "Profile updated successfully",
      user: userResponse
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};
const getAllUsers = (req, res) => {
  const usersWithoutPasswords = userDatabase.map((user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
  res.json({
    success: true,
    users: usersWithoutPasswords,
    total: usersWithoutPasswords.length
  });
};
const mockBookings = [];
const createBooking = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token required"
    });
  }
  const { bikeId, startDate, endDate, location } = req.body;
  if (!bikeId || !startDate || !endDate || !location) {
    return res.status(400).json({
      success: false,
      message: "Missing required booking information"
    });
  }
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = /* @__PURE__ */ new Date();
  if (start < now) {
    return res.status(400).json({
      success: false,
      message: "Start date cannot be in the past"
    });
  }
  if (end <= start) {
    return res.status(400).json({
      success: false,
      message: "End date must be after start date"
    });
  }
  const durationMs = end.getTime() - start.getTime();
  const durationDays = Math.ceil(durationMs / (1e3 * 60 * 60 * 24));
  const bikePrice = getBikePriceById(bikeId);
  const totalAmount = durationDays * bikePrice;
  const token = authHeader.substring(7);
  const decoded = Buffer.from(token, "base64").toString();
  const [userId] = decoded.split(":");
  const booking = {
    id: mockBookings.length + 1,
    bikeId,
    userId: parseInt(userId),
    startDate,
    endDate,
    totalAmount,
    status: "pending",
    paymentStatus: "pending",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  mockBookings.push(booking);
  res.json({
    success: true,
    message: "Booking created successfully",
    booking
  });
};
const getUserBookings = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token required"
    });
  }
  const token = authHeader.substring(7);
  const decoded = Buffer.from(token, "base64").toString();
  const [userId] = decoded.split(":");
  const userBookings = mockBookings.filter((b) => b.userId === parseInt(userId));
  res.json({
    success: true,
    bookings: userBookings
  });
};
const getBookingById = (req, res) => {
  const bookingId = parseInt(req.params.id);
  const booking = mockBookings.find((b) => b.id === bookingId);
  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found"
    });
  }
  res.json({
    success: true,
    booking
  });
};
const cancelBooking = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token required"
    });
  }
  const bookingId = parseInt(req.params.id);
  const booking = mockBookings.find((b) => b.id === bookingId);
  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found"
    });
  }
  const token = authHeader.substring(7);
  const decoded = Buffer.from(token, "base64").toString();
  const [userId] = decoded.split(":");
  if (booking.userId !== parseInt(userId)) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to cancel this booking"
    });
  }
  booking.status = "cancelled";
  res.json({
    success: true,
    message: "Booking cancelled successfully",
    booking
  });
};
const processPayment = (req, res) => {
  const { bookingId, amount, paymentMethod } = req.body;
  if (!bookingId || !amount || !paymentMethod) {
    return res.status(400).json({
      success: false,
      message: "Missing payment information"
    });
  }
  const booking = mockBookings.find((b) => b.id === bookingId);
  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found"
    });
  }
  if (booking.paymentStatus === "paid") {
    return res.status(400).json({
      success: false,
      message: "Payment already completed"
    });
  }
  const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  booking.paymentStatus = "paid";
  booking.status = "confirmed";
  res.json({
    success: true,
    message: "Payment processed successfully",
    paymentId
  });
};
function getBikePriceById(bikeId) {
  const bikePrices = {
    1: 1e3,
    // Royal Enfield Classic 350
    2: 500,
    // Honda Activa 6G
    3: 1200,
    // KTM Duke 390
    4: 900,
    // Bajaj Pulsar N250
    5: 500,
    // TVS Jupiter
    6: 500
    // Hero Splendor Plus
  };
  return bikePrices[bikeId] || 500;
}
const mockLocationData = [
  {
    city: "Mumbai",
    state: "Maharashtra",
    coordinates: { lat: 19.076, lng: 72.8777 },
    availableBikes: 120,
    totalBikes: 150,
    popularBikes: ["Royal Enfield Classic 350", "Honda Activa 6G", "KTM Duke 390"]
  },
  {
    city: "Delhi",
    state: "Delhi",
    coordinates: { lat: 28.6139, lng: 77.209 },
    availableBikes: 95,
    totalBikes: 120,
    popularBikes: ["Honda Activa 6G", "Hero Splendor Plus", "Bajaj Pulsar 220F"]
  },
  {
    city: "Bangalore",
    state: "Karnataka",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    availableBikes: 80,
    totalBikes: 100,
    popularBikes: ["KTM Duke 390", "Royal Enfield Classic 350", "TVS Jupiter"]
  },
  {
    city: "Chennai",
    state: "Tamil Nadu",
    coordinates: { lat: 13.0827, lng: 80.2707 },
    availableBikes: 65,
    totalBikes: 80,
    popularBikes: ["Bajaj Pulsar 220F", "Honda Activa 6G", "TVS Jupiter"]
  },
  {
    city: "Hyderabad",
    state: "Telangana",
    coordinates: { lat: 17.385, lng: 78.4867 },
    availableBikes: 70,
    totalBikes: 90,
    popularBikes: ["TVS Jupiter", "Hero Splendor Plus", "Royal Enfield Classic 350"]
  },
  {
    city: "Pune",
    state: "Maharashtra",
    coordinates: { lat: 18.5204, lng: 73.8567 },
    availableBikes: 55,
    totalBikes: 70,
    popularBikes: ["Hero Splendor Plus", "Honda Activa 6G", "KTM Duke 390"]
  },
  {
    city: "Kolkata",
    state: "West Bengal",
    coordinates: { lat: 22.5726, lng: 88.3639 },
    availableBikes: 45,
    totalBikes: 60,
    popularBikes: ["Honda Activa 6G", "Hero Splendor Plus", "TVS Jupiter"]
  },
  {
    city: "Ahmedabad",
    state: "Gujarat",
    coordinates: { lat: 23.0225, lng: 72.5714 },
    availableBikes: 40,
    totalBikes: 55,
    popularBikes: ["Hero Splendor Plus", "Bajaj Pulsar 220F", "Honda Activa 6G"]
  },
  {
    city: "Jaipur",
    state: "Rajasthan",
    coordinates: { lat: 26.9124, lng: 75.7873 },
    availableBikes: 35,
    totalBikes: 45,
    popularBikes: ["Royal Enfield Classic 350", "Hero Splendor Plus", "Honda Activa 6G"]
  },
  {
    city: "Kochi",
    state: "Kerala",
    coordinates: { lat: 9.9312, lng: 76.2673 },
    availableBikes: 30,
    totalBikes: 40,
    popularBikes: ["Honda Activa 6G", "TVS Jupiter", "Hero Splendor Plus"]
  },
  {
    city: "Goa",
    state: "Goa",
    coordinates: { lat: 15.2993, lng: 74.124 },
    availableBikes: 50,
    totalBikes: 65,
    popularBikes: ["Royal Enfield Classic 350", "KTM Duke 390", "Honda Activa 6G"]
  },
  {
    city: "Chandigarh",
    state: "Punjab",
    coordinates: { lat: 30.7333, lng: 76.7794 },
    availableBikes: 25,
    totalBikes: 35,
    popularBikes: ["Hero Splendor Plus", "Bajaj Pulsar 220F", "Honda Activa 6G"]
  }
];
const getMapData = (req, res) => {
  const responseData = mockLocationData.map((location) => ({
    ...location,
    availableBikes: Math.max(0, location.availableBikes - Math.floor(Math.random() * 10))
  }));
  const response = {
    locations: responseData
  };
  res.json(response);
};
const getLocationData = (req, res) => {
  const { city } = req.params;
  const location = mockLocationData.find(
    (loc) => loc.city.toLowerCase() === city.toLowerCase()
  );
  if (!location) {
    return res.status(404).json({
      success: false,
      message: "Location not found"
    });
  }
  res.json({
    success: true,
    location
  });
};
const searchNearbyLocations = (req, res) => {
  const { lat, lng, radius = 100 } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({
      success: false,
      message: "Latitude and longitude are required"
    });
  }
  const userLat = parseFloat(lat);
  const userLng = parseFloat(lng);
  const searchRadius = parseFloat(radius);
  const nearbyLocations = mockLocationData.filter((location) => {
    const distance = calculateDistance(
      userLat,
      userLng,
      location.coordinates.lat,
      location.coordinates.lng
    );
    return distance <= searchRadius;
  }).sort((a, b) => {
    const distanceA = calculateDistance(userLat, userLng, a.coordinates.lat, a.coordinates.lng);
    const distanceB = calculateDistance(userLat, userLng, b.coordinates.lat, b.coordinates.lng);
    return distanceA - distanceB;
  });
  res.json({
    success: true,
    locations: nearbyLocations
  });
};
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
function createServer() {
  const app2 = express__default();
  app2.use(cors());
  app2.use(express__default.json());
  app2.use(express__default.urlencoded({ extended: true }));
  app2.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app2.get("/api/demo", handleDemo);
  app2.get("/api/bikes", getBikes);
  app2.get("/api/bikes/featured", getFeaturedBikes);
  app2.get("/api/bikes/:id", getBikeById);
  app2.post("/api/auth/request-otp", requestOTP);
  app2.post("/api/auth/verify-otp", verifyOTP);
  app2.post("/api/auth/login", loginWithEmail);
  app2.post("/api/auth/signup", completeSignup);
  app2.post("/api/auth/verify-aadhar", verifyAadhar);
  app2.post("/api/auth/verify-aadhar-otp", verifyAadharOTP);
  app2.post("/api/auth/verify-dl", verifyDL);
  app2.post("/api/auth/verify-dl-otp", verifyDLOTP);
  app2.get("/api/auth/google", googleAuth);
  app2.get("/api/auth/google/callback", googleCallback);
  app2.get("/api/auth/users", getAllUsers);
  app2.get("/api/auth/profile", getUserProfile);
  app2.put("/api/auth/profile", updateProfile);
  app2.post("/api/bookings", createBooking);
  app2.get("/api/bookings", getUserBookings);
  app2.get("/api/bookings/:id", getBookingById);
  app2.delete("/api/bookings/:id", cancelBooking);
  app2.post("/api/payments", processPayment);
  app2.get("/api/map/data", getMapData);
  app2.get("/api/map/location/:city", getLocationData);
  app2.get("/api/map/nearby", searchNearbyLocations);
  app2.post("/api/contact", (req, res) => {
    const { name, email, phone, subject, category, message } = req.body;
    if (!name || !email || !subject || !category || !message) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled"
      });
    }
    console.log("Contact form submission:", { name, email, phone, subject, category, message });
    res.json({
      success: true,
      message: "Thank you for your message. We'll get back to you soon!"
    });
  });
  return app2;
}
const app = createServer();
const port = process.env.PORT || 3e3;
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
//# sourceMappingURL=node-build.mjs.map
