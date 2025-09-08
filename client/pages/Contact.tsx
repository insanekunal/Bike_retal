import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Bike, Phone, Mail, MapPin, Clock, MessageCircle, 
  Headphones, Users, Shield, Send, CheckCircle,
  Facebook, Twitter, Instagram, Linkedin, Youtube
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      info: "+91 98765 43210",
      description: "24/7 customer support",
      action: "tel:+919876543210"
    },
    {
      icon: Mail,
      title: "Email Support",
      info: "support@rideeasy.com",
      description: "We reply within 2 hours",
      action: "mailto:support@rideeasy.com"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      info: "Available 24/7",
      description: "Instant assistance",
      action: "#"
    },
    {
      icon: MapPin,
      title: "Head Office",
      info: "Mumbai, Maharashtra",
      description: "Visit us during business hours",
      action: "#"
    }
  ];

  const supportCategories = [
    { value: "booking", label: "Booking Issues" },
    { value: "payment", label: "Payment Problems" },
    { value: "bike", label: "Bike Related" },
    { value: "account", label: "Account Support" },
    { value: "technical", label: "Technical Issues" },
    { value: "feedback", label: "Feedback & Suggestions" },
    { value: "partnership", label: "Business Partnership" },
    { value: "other", label: "Other" }
  ];

  const offices = [
    {
      city: "Mumbai",
      address: "Unit 401, Tech Park, Andheri East, Mumbai - 400069",
      phone: "+91 22 4567 8901",
      email: "mumbai@rideeasy.com",
      timing: "Mon-Sat: 9:00 AM - 8:00 PM"
    },
    {
      city: "Delhi",
      address: "Floor 5, Cyber Hub, Gurgaon, Delhi NCR - 122002",
      phone: "+91 11 4567 8902",
      email: "delhi@rideeasy.com",
      timing: "Mon-Sat: 9:00 AM - 8:00 PM"
    },
    {
      city: "Bangalore",
      address: "Wing B, IT Park, Electronic City, Bangalore - 560100",
      phone: "+91 80 4567 8903",
      email: "bangalore@rideeasy.com",
      timing: "Mon-Sat: 9:00 AM - 8:00 PM"
    }
  ];

  const faqs = [
    {
      question: "How do I book a bike?",
      answer: "Simply browse our bikes, select your preferred one, choose dates, and complete the booking with payment."
    },
    {
      question: "What documents do I need?",
      answer: "You need a valid driving license and Aadhar card for verification. Both will be verified via OTP."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel up to 2 hours before your booking time for a full refund."
    },
    {
      question: "What if the bike breaks down?",
      answer: "Contact our 24/7 support immediately. We'll arrange a replacement or roadside assistance."
    },
    {
      question: "Are helmets provided?",
      answer: "Yes, we provide sanitized helmets with every bike rental for your safety."
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", url: "https://facebook.com/rideeasy" },
    { icon: Twitter, name: "Twitter", url: "https://twitter.com/rideeasy" },
    { icon: Instagram, name: "Instagram", url: "https://instagram.com/rideeasy" },
    { icon: Linkedin, name: "LinkedIn", url: "https://linkedin.com/company/rideeasy" },
    { icon: Youtube, name: "YouTube", url: "https://youtube.com/rideeasy" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          category: "",
          message: ""
        });
      } else {
        setError(data.message || 'Failed to send message');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Bike className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">RideEasy</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</a>
            <a href="/bikes" className="text-muted-foreground hover:text-primary transition-colors">Bikes</a>
            <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="/contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background animate-gradient"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We're here to help you with any questions, concerns, or feedback. 
              Reach out to us through any of the channels below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center bg-card border-border hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardContent className="pt-6">
                      <Icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">{contact.title}</h3>
                      <p className="text-primary font-medium mb-1">{contact.info}</p>
                      <p className="text-muted-foreground text-sm">{contact.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                    <Send className="w-6 h-6 text-primary" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {success ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                      <Button
                        onClick={() => setSuccess(false)}
                        className="mt-4"
                        variant="outline"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                          <Input
                            id="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="bg-background border-border"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-foreground">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="bg-background border-border"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="bg-background border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category" className="text-foreground">Category *</Label>
                          <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                            <SelectTrigger className="bg-background border-border">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {supportCategories.map(cat => (
                                <SelectItem key={cat.value} value={cat.value}>
                                  {cat.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-foreground">Subject *</Label>
                        <Input
                          id="subject"
                          placeholder="Brief description of your inquiry"
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="bg-background border-border"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-foreground">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Please provide details about your inquiry..."
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="bg-background border-border min-h-32"
                          required
                        />
                      </div>

                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        {loading ? (
                          <>
                            <Send className="w-4 h-4 mr-2 animate-pulse" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  Our Offices
                </h2>
                <p className="text-muted-foreground mb-6">
                  Visit us at any of our offices across India for in-person assistance.
                </p>
              </div>

              {offices.map((office, index) => (
                <motion.div
                  key={office.city}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-3">{office.city}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{office.address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">{office.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">{office.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">{office.timing}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Quick answers to common questions about our bike rental service
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Follow Us</h2>
            <p className="text-muted-foreground mb-8">
              Stay connected with us on social media for updates, tips, and special offers
            </p>
            
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="w-12 h-12 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Bike className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">RideEasy</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Your trusted partner for bike rentals across India. 
                Safe, secure, and always reliable.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@rideeasy.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4" />
                  <span>24/7 Live Chat</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support Hours</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Phone: 24/7</div>
                <div>Email: 2 hour response</div>
                <div>Live Chat: 24/7</div>
                <div>Office: Mon-Sat 9AM-8PM</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Emergency</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Breakdown: +91 98765 43211</div>
                <div>Accident: +91 98765 43212</div>
                <div>Lost/Stolen: +91 98765 43213</div>
                <div>Police: 100</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 RideEasy. All rights reserved. Here to help you ride safely.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
