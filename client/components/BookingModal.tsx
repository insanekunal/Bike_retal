import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin, Clock, CreditCard, User, Phone, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bike: {
    id: number;
    name: string;
    price: number;
    location: string;
    image: string;
    features: string[];
    rating: number;
  } | null;
  onBookingSuccess?: () => void;
}

export default function BookingModal({ open, onOpenChange, bike, onBookingSuccess }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    pickupLocation: "",
    dropoffLocation: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    paymentMethod: "upi"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!bike) return null;

  // Calculate duration and total amount
  const startDate = new Date(bookingData.startDate);
  const endDate = new Date(bookingData.endDate);
  const durationMs = endDate.getTime() - startDate.getTime();
  const durationDays = Math.max(1, Math.ceil(durationMs / (1000 * 60 * 60 * 24)));
  const totalAmount = durationDays * bike.price;

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(bookingData.startDate && bookingData.endDate && bookingData.pickupLocation);
      case 2:
        return !!(bookingData.customerName && bookingData.customerPhone && bookingData.customerEmail);
      case 3:
        return !!bookingData.paymentMethod;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleBooking = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const bookingPayload = {
        bikeId: bike.id,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        location: bookingData.pickupLocation,
        userId: 1 // Mock user ID
      };

      // In a real app, this would make an API call to create the booking
      console.log('Creating booking:', bookingPayload);
      
      setBookingStatus('success');
      setCurrentStep(4);
      
      setTimeout(() => {
        onBookingSuccess?.();
        onOpenChange(false);
        // Reset modal state
        setCurrentStep(1);
        setBookingStatus('idle');
        setBookingData({
          startDate: "",
          endDate: "",
          pickupLocation: "",
          dropoffLocation: "",
          customerName: "",
          customerPhone: "",
          customerEmail: "",
          paymentMethod: "upi"
        });
      }, 3000);
      
    } catch (error) {
      setBookingStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Dates & Location", icon: Calendar },
    { number: 2, title: "Your Details", icon: User },
    { number: 3, title: "Payment", icon: CreditCard },
    { number: 4, title: "Confirmation", icon: CheckCircle }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Book Your Ride</DialogTitle>
          <DialogDescription>
            Reserve {bike.name} for your next adventure
          </DialogDescription>
        </DialogHeader>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Bike Summary Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <img 
                    src={bike.image} 
                    alt={bike.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  
                  <div>
                    <h3 className="font-semibold text-lg">{bike.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {bike.location}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {bike.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Price per day:</span>
                      <span className="font-medium">₹{bike.price}</span>
                    </div>
                    {bookingData.startDate && bookingData.endDate && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span>Duration:</span>
                          <span className="font-medium">{durationDays} day{durationDays > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-primary">
                          <span>Total:</span>
                          <span>₹{totalAmount}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                        currentStep >= step.number
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'border-muted bg-background text-muted-foreground'
                      }`}
                      animate={{ scale: currentStep === step.number ? 1.1 : 1 }}
                    >
                      <step.icon className="w-5 h-5" />
                    </motion.div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-0.5 w-16 ml-2 transition-colors ${
                          currentStep > step.number ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {steps.map((step) => (
                  <div key={step.number} className="text-xs text-center w-10">
                    {step.title}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Select Dates & Location
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={bookingData.startDate}
                            onChange={(e) => handleInputChange('startDate', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div>
                          <Label htmlFor="endDate">End Date</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={bookingData.endDate}
                            onChange={(e) => handleInputChange('endDate', e.target.value)}
                            min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="pickupLocation">Pickup Location</Label>
                        <Input
                          id="pickupLocation"
                          placeholder="Enter pickup location"
                          value={bookingData.pickupLocation}
                          onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="dropoffLocation">Drop-off Location (Optional)</Label>
                        <Input
                          id="dropoffLocation"
                          placeholder="Same as pickup location"
                          value={bookingData.dropoffLocation}
                          onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {currentStep === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Your Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="customerName">Full Name</Label>
                        <Input
                          id="customerName"
                          placeholder="Enter your full name"
                          value={bookingData.customerName}
                          onChange={(e) => handleInputChange('customerName', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="customerPhone">Phone Number</Label>
                        <Input
                          id="customerPhone"
                          placeholder="+91 98765 43210"
                          value={bookingData.customerPhone}
                          onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="customerEmail">Email Address</Label>
                        <Input
                          id="customerEmail"
                          type="email"
                          placeholder="your@email.com"
                          value={bookingData.customerEmail}
                          onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {currentStep === 3 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Payment Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { id: 'upi', label: 'UPI Payment', desc: 'GooglePay, PhonePe, Paytm' },
                          { id: 'card', label: 'Credit/Debit Card', desc: 'Visa, MasterCard, Rupay' },
                          { id: 'netbanking', label: 'Net Banking', desc: 'All major banks' },
                          { id: 'wallet', label: 'Digital Wallet', desc: 'Paytm, Amazon Pay' }
                        ].map((method) => (
                          <div
                            key={method.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              bookingData.paymentMethod === method.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                            onClick={() => handleInputChange('paymentMethod', method.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-4 h-4 rounded-full border-2 ${
                                  bookingData.paymentMethod === method.id
                                    ? 'border-primary bg-primary'
                                    : 'border-muted-foreground'
                                }`}
                              />
                              <div>
                                <div className="font-medium">{method.label}</div>
                                <div className="text-sm text-muted-foreground">{method.desc}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-muted/20 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Booking Summary</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>{bike.name} × {durationDays} day{durationDays > 1 ? 's' : ''}</span>
                            <span>₹{totalAmount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Platform fee</span>
                            <span>₹99</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Security deposit (refundable)</span>
                            <span>₹2,000</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-bold">
                            <span>Total Amount</span>
                            <span>₹{totalAmount + 99 + 2000}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {currentStep === 4 && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center space-y-6">
                        {bookingStatus === 'success' ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="space-y-4"
                          >
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                            <h3 className="text-2xl font-bold text-green-600">Booking Confirmed!</h3>
                            <p className="text-muted-foreground">
                              Your booking for {bike.name} has been confirmed. 
                              You'll receive a confirmation email shortly.
                            </p>
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                              <p className="text-sm">
                                <strong>Booking ID:</strong> RB{Date.now()}
                              </p>
                            </div>
                          </motion.div>
                        ) : bookingStatus === 'error' ? (
                          <div className="space-y-4">
                            <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
                            <h3 className="text-2xl font-bold text-red-600">Booking Failed</h3>
                            <p className="text-muted-foreground">
                              Sorry, we couldn't process your booking. Please try again.
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                {currentStep === 3 ? (
                  <Button
                    onClick={handleBooking}
                    disabled={!validateStep(currentStep) || isLoading}
                    className="bg-gradient-to-r from-primary to-accent"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextStep}
                    disabled={!validateStep(currentStep)}
                    className="bg-gradient-to-r from-primary to-accent"
                  >
                    Next Step
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
