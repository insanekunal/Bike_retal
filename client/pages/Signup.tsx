import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bike, Mail, Lock, Eye, EyeOff, Chrome, Loader2, ArrowLeft, 
  User, Phone, CreditCard, Shield, CheckCircle, FileText
} from "lucide-react";
import { motion } from "framer-motion";

interface DocumentVerification {
  aadharNumber: string;
  dlNumber: string;
  aadharOTP: string;
  dlOTP: string;
  aadharVerified: boolean;
  dlVerified: boolean;
}

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'basic' | 'documents' | 'verification'>('basic');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Basic Info
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    agreeToTerms: false
  });

  // Document Verification
  const [documents, setDocuments] = useState<DocumentVerification>({
    aadharNumber: "",
    dlNumber: "",
    aadharOTP: "",
    dlOTP: "",
    aadharVerified: false,
    dlVerified: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBasicInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setStep('documents');
  };

  const requestAadharOTP = async () => {
    if (!documents.aadharNumber || documents.aadharNumber.length !== 12) {
      setError("Please enter a valid 12-digit Aadhar number");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/verify-aadhar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aadharNumber: documents.aadharNumber }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`OTP sent to registered mobile number. Demo OTP: ${data.otp}`);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyAadharOTP = async () => {
    if (!documents.aadharOTP || documents.aadharOTP.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/verify-aadhar-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          aadharNumber: documents.aadharNumber,
          otp: documents.aadharOTP 
        }),
      });

      const data = await response.json();
      if (data.success) {
        setDocuments(prev => ({ ...prev, aadharVerified: true }));
        setError("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const requestDLOTP = async () => {
    if (!documents.dlNumber || documents.dlNumber.length < 10) {
      setError("Please enter a valid driving license number");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/verify-dl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dlNumber: documents.dlNumber }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`OTP sent to registered mobile number. Demo OTP: ${data.otp}`);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyDLOTP = async () => {
    if (!documents.dlOTP || documents.dlOTP.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/verify-dl-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          dlNumber: documents.dlNumber,
          otp: documents.dlOTP 
        }),
      });

      const data = await response.json();
      if (data.success) {
        setDocuments(prev => ({ ...prev, dlVerified: true }));
        setError("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSignup = async () => {
    if (!documents.aadharVerified || !documents.dlVerified) {
      setError("Please complete both Aadhar and Driving License verification");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          aadharNumber: documents.aadharNumber,
          dlNumber: documents.dlNumber,
          verified: true
        }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden py-8">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background animate-gradient"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-xl"></div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 left-8"
      >
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mx-auto p-6 relative z-10"
      >
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <Bike className="w-10 h-10 text-primary-foreground" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Join RideEasy</h1>
          <p className="text-muted-foreground">Create your account with secure verification</p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-foreground">
              {step === 'basic' ? 'Basic Information' : 
               step === 'documents' ? 'Document Verification' : 'Complete Registration'}
            </CardTitle>
            
            {/* Progress Indicator */}
            <div className="flex justify-center space-x-2 mt-4">
              <div className={`w-3 h-3 rounded-full ${step === 'basic' ? 'bg-primary' : 'bg-primary/50'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step === 'documents' ? 'bg-primary' : step === 'verification' ? 'bg-primary/50' : 'bg-muted'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step === 'verification' ? 'bg-primary' : 'bg-muted'}`}></div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 'basic' && (
              <>
                {/* Google Signup */}
                <Button
                  variant="outline"
                  onClick={handleGoogleSignup}
                  className="w-full h-12 bg-background hover:bg-muted/50 border-border"
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or create account manually</span>
                  </div>
                </div>

                {/* Basic Info Form */}
                <form onSubmit={handleBasicInfoSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="firstName"
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="pl-10 h-12 bg-background border-border"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="h-12 bg-background border-border"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="pl-10 h-12 bg-background border-border"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="pl-10 h-12 bg-background border-border"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-foreground">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                        className="h-12 bg-background border-border"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-foreground">Gender</Label>
                      <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                        <SelectTrigger className="h-12 bg-background border-border">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="pl-10 pr-10 h-12 bg-background border-border"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="pl-10 pr-10 h-12 bg-background border-border"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: checked as boolean})}
                    />
                    <Label htmlFor="terms" className="text-sm text-foreground">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Continue to Verification
                  </Button>
                </form>
              </>
            )}

            {step === 'documents' && (
              <div className="space-y-6">
                <div className="text-center">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Document Verification</h3>
                  <p className="text-muted-foreground text-sm">
                    Please verify your Aadhar and Driving License for secure account setup
                  </p>
                </div>

                <Tabs defaultValue="aadhar" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="aadhar" className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Aadhar Card
                      {documents.aadharVerified && <CheckCircle className="w-4 h-4 text-green-500" />}
                    </TabsTrigger>
                    <TabsTrigger value="dl" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Driving License
                      {documents.dlVerified && <CheckCircle className="w-4 h-4 text-green-500" />}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="aadhar" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="aadhar" className="text-foreground">Aadhar Number</Label>
                      <Input
                        id="aadhar"
                        placeholder="Enter 12-digit Aadhar number"
                        value={documents.aadharNumber}
                        onChange={(e) => setDocuments(prev => ({...prev, aadharNumber: e.target.value}))}
                        className="h-12 bg-background border-border"
                        maxLength={12}
                        disabled={documents.aadharVerified}
                      />
                    </div>

                    {!documents.aadharVerified && (
                      <>
                        <Button
                          onClick={requestAadharOTP}
                          disabled={loading || documents.aadharNumber.length !== 12}
                          className="w-full"
                        >
                          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                          Send OTP
                        </Button>

                        <div className="space-y-2">
                          <Label htmlFor="aadharOTP" className="text-foreground">Enter OTP</Label>
                          <div className="flex gap-2">
                            <Input
                              id="aadharOTP"
                              placeholder="6-digit OTP"
                              value={documents.aadharOTP}
                              onChange={(e) => setDocuments(prev => ({...prev, aadharOTP: e.target.value}))}
                              className="h-12 bg-background border-border"
                              maxLength={6}
                            />
                            <Button
                              onClick={verifyAadharOTP}
                              disabled={loading || documents.aadharOTP.length !== 6}
                            >
                              Verify
                            </Button>
                          </div>
                        </div>
                      </>
                    )}

                    {documents.aadharVerified && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span>Aadhar verified successfully</span>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="dl" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dl" className="text-foreground">Driving License Number</Label>
                      <Input
                        id="dl"
                        placeholder="Enter DL number"
                        value={documents.dlNumber}
                        onChange={(e) => setDocuments(prev => ({...prev, dlNumber: e.target.value}))}
                        className="h-12 bg-background border-border"
                        disabled={documents.dlVerified}
                      />
                    </div>

                    {!documents.dlVerified && (
                      <>
                        <Button
                          onClick={requestDLOTP}
                          disabled={loading || documents.dlNumber.length < 10}
                          className="w-full"
                        >
                          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                          Send OTP
                        </Button>

                        <div className="space-y-2">
                          <Label htmlFor="dlOTP" className="text-foreground">Enter OTP</Label>
                          <div className="flex gap-2">
                            <Input
                              id="dlOTP"
                              placeholder="6-digit OTP"
                              value={documents.dlOTP}
                              onChange={(e) => setDocuments(prev => ({...prev, dlOTP: e.target.value}))}
                              className="h-12 bg-background border-border"
                              maxLength={6}
                            />
                            <Button
                              onClick={verifyDLOTP}
                              disabled={loading || documents.dlOTP.length !== 6}
                            >
                              Verify
                            </Button>
                          </div>
                        </div>
                      </>
                    )}

                    {documents.dlVerified && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span>Driving License verified successfully</span>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep('basic')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleFinalSignup}
                    disabled={loading || !documents.aadharVerified || !documents.dlVerified}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Complete Registration'
                    )}
                  </Button>
                </div>
              </div>
            )}

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
