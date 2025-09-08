import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CreditCard, Smartphone, Building, Wallet, Shield, Check } from "lucide-react";
import { motion } from "framer-motion";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingData?: {
    bikeId: number;
    bikeName: string;
    amount: number;
    duration: string;
  };
  onPaymentSuccess?: () => void;
}

const paymentMethods = [
  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
  { id: 'upi', label: 'UPI Payment', icon: Smartphone },
  { id: 'netbanking', label: 'Net Banking', icon: Building },
  { id: 'wallet', label: 'Digital Wallet', icon: Wallet }
];

export default function PaymentModal({ open, onOpenChange, bookingData, onPaymentSuccess }: PaymentModalProps) {
  const [step, setStep] = useState<'method' | 'details' | 'processing' | 'success'>('method');
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form data
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [upiId, setUpiId] = useState('');

  const handlePaymentMethodSelect = () => {
    setStep('details');
    setError('');
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Validate form based on selected method
      if (selectedMethod === 'card') {
        if (!cardNumber || !expiryDate || !cvv || !cardName) {
          setError('Please fill all card details');
          setLoading(false);
          return;
        }
      } else if (selectedMethod === 'upi') {
        if (!upiId) {
          setError('Please enter UPI ID');
          setLoading(false);
          return;
        }
      }

      setStep('processing');

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          bookingId: 1, // This would come from actual booking
          amount: bookingData?.amount || 0,
          paymentMethod: selectedMethod
        })
      });

      const data = await response.json();

      if (data.success) {
        setStep('success');
        setTimeout(() => {
          onPaymentSuccess?.();
          onOpenChange(false);
          resetForm();
        }, 2000);
      } else {
        setError(data.message || 'Payment failed');
        setStep('details');
      }
    } catch (err) {
      setError('Payment processing failed. Please try again.');
      setStep('details');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep('method');
    setSelectedMethod('upi');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setCardName('');
    setUpiId('');
    setError('');
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-foreground">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19))}
                className="bg-background border-border"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry" className="text-foreground">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length >= 2) {
                      value = value.slice(0, 2) + '/' + value.slice(2, 4);
                    }
                    setExpiryDate(value);
                  }}
                  maxLength={5}
                  className="bg-background border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-foreground">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  className="bg-background border-border"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardName" className="text-foreground">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="bg-background border-border"
              />
            </div>
          </div>
        );
        
      case 'upi':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="upiId" className="text-foreground">UPI ID</Label>
              <Input
                id="upiId"
                placeholder="yourname@paytm"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Enter your UPI ID or scan the QR code using any UPI app
            </div>
          </div>
        );
        
      case 'netbanking':
        return (
          <div className="space-y-4">
            <div className="text-center text-muted-foreground">
              You will be redirected to your bank's website to complete the payment
            </div>
          </div>
        );
        
      case 'wallet':
        return (
          <div className="space-y-4">
            <div className="text-center text-muted-foreground">
              Choose your preferred digital wallet to complete the payment
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-center text-foreground">
            {step === 'method' && 'Choose Payment Method'}
            {step === 'details' && 'Payment Details'}
            {step === 'processing' && 'Processing Payment'}
            {step === 'success' && 'Payment Successful'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Booking Summary */}
          {bookingData && (
            <Card className="bg-muted/50 border-border">
              <CardContent className="pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bike:</span>
                    <span className="font-medium text-foreground">{bookingData.bikeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium text-foreground">{bookingData.duration}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span className="text-foreground">Total:</span>
                    <span className="text-primary">₹{bookingData.amount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 'method' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div key={method.id} className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Icon className="w-5 h-5 text-primary" />
                      <Label htmlFor={method.id} className="flex-1 cursor-pointer text-foreground">
                        {method.label}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>

              <Button onClick={handlePaymentMethodSelect} className="w-full bg-primary hover:bg-primary/90">
                Continue
              </Button>
            </motion.div>
          )}

          {step === 'details' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {renderPaymentForm()}

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setStep('method')} className="flex-1">
                  Back
                </Button>
                <Button onClick={handlePayment} disabled={loading} className="flex-1 bg-primary hover:bg-primary/90">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Pay ₹{bookingData?.amount || 0}
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Processing Payment</h3>
              <p className="text-muted-foreground">Please wait while we process your payment...</p>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Payment Successful!</h3>
              <p className="text-muted-foreground">Your booking has been confirmed. You will receive a confirmation email shortly.</p>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
