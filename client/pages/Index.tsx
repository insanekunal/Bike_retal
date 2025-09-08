import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, Search, Star, Bike, Zap, Shield, Clock,
  Play, Users, Award, Heart, TrendingUp, CheckCircle,
  ArrowRight, Phone, Mail, MessageCircle, Smartphone,
  Monitor, Tablet, ChevronLeft, ChevronRight, PlayCircle
} from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import AuthModal from "@/components/AuthModal";
import IndiaMap from "@/components/IndiaMap";
import PaymentModal from "@/components/PaymentModal";

const featuredBikes = [
  {
    id: 1,
    name: "Royal Enfield Classic 350",
    location: "Mumbai",
    price: "₹1000",
    rating: 4.8,
    image: "https://cdn.builder.io/api/v1/image/assets%2F51218e8445d94a61bcf324c702b7ca69%2F2bb6b62497af4e0480a47e1815233ea4",
    features: ["350cc", "Manual", "Petrol"],
    available: true,
    reviews: 142
  },
  {
    id: 2,
    name: "Honda Activa 6G",
    location: "Delhi",
    price: "₹500",
    rating: 4.6,
    image: "https://cdn.builder.io/api/v1/image/assets%2F51218e8445d94a61bcf324c702b7ca69%2Fce42bd7c282447599b4b8037f27383e7",
    features: ["110cc", "Automatic", "Petrol"],
    available: true,
    reviews: 89
  },
  {
    id: 3,
    name: "KTM Duke 390",
    location: "Bangalore",
    price: "₹1200",
    rating: 4.9,
    image: "https://cdn.builder.io/api/v1/image/assets%2F51218e8445d94a61bcf324c702b7ca69%2F3e65d192410c4554b4119cbdae16e131",
    features: ["390cc", "Manual", "Petrol"],
    available: false,
    reviews: 203
  }
];

const locations = [
  { name: "Mumbai", bikes: 150, growth: "+12%" },
  { name: "Delhi", bikes: 120, growth: "+8%" },
  { name: "Bangalore", bikes: 100, growth: "+15%" },
  { name: "Chennai", bikes: 80, growth: "+10%" },
  { name: "Hyderabad", bikes: 90, growth: "+18%" },
  { name: "Dehradun", bikes: 70, growth: "+22%" }
];

const testimonials = [
  {
    name: "Rahul Sharma",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    rating: 5,
    text: "Amazing service! The bike was in perfect condition and the booking process was seamless.",
    location: "Mumbai"
  },
  {
    name: "Priya Patel",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b639?w=80&q=80",
    rating: 5,
    text: "RideEasy made my daily commute so much easier. Highly recommend to everyone!",
    location: "Pune"
  },
  {
    name: "Arjun Singh",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
    rating: 5,
    text: "Great variety of bikes and excellent customer support. Will definitely use again!",
    location: "Delhi"
  }
];

const stats = [
  { label: "Happy Riders", value: 0, target: 50000, suffix: "+" },
  { label: "Cities", value: 0, target: 25, suffix: "+" },
  { label: "Bikes", value: 0, target: 5000, suffix: "+" },
  { label: "Daily Rides", value: 0, target: 500, suffix: "+" }
];

const demoSlides = [
  {
    title: "Easy Mobile Booking",
    description: "Book your perfect bike in just 3 taps with our intuitive mobile app",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
    features: ["One-tap booking", "Real-time availability", "Instant confirmation"]
  },
  {
    title: "Smart Search & Filters",
    description: "Find exactly what you need with AI-powered search and advanced filters",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80",
    features: ["AI recommendations", "Price comparison", "Location-based results"]
  },
  {
    title: "Secure Payment System",
    description: "Multiple payment options with bank-grade security for peace of mind",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
    features: ["UPI payments", "Card security", "Instant refunds"]
  },
  {
    title: "Live Tracking & Support",
    description: "Track your ride in real-time with 24/7 customer support always available",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    features: ["GPS tracking", "24/7 support", "Emergency assistance"]
  }
];

const videoContent = {
  booking: {
    title: "How to Book a Bike",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    duration: "2:30",
    description: "Learn how to book your perfect bike in under 60 seconds"
  },
  features: {
    title: "App Features Overview",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80",
    duration: "3:45",
    description: "Discover all the amazing features that make RideEasy special"
  },
  safety: {
    title: "Safety & Guidelines",
    thumbnail: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&q=80",
    duration: "4:20",
    description: "Important safety guidelines and best practices for riders"
  }
};

export default function Index() {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);
  const [user, setUser] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedStats, setAnimatedStats] = useState(stats);
  const [heroVideoPlaying, setHeroVideoPlaying] = useState(false);
  const [currentDemoSlide, setCurrentDemoSlide] = useState(0);
  const [activeVideoTab, setActiveVideoTab] = useState('booking');

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);

  // Animated counters for stats
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: stat.target
        }))
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Demo slide rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemoSlide((prev) => (prev + 1) % demoSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleBookNow = (bike: any) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setSelectedBike({
      bikeId: bike.id,
      bikeName: bike.name,
      amount: bike.price,
      duration: "1 day"
    });
    setShowPaymentModal(true);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border-b border-border/40 backdrop-blur-md bg-background/80 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Bike className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              RideEasy
            </h1>
          </motion.div>
          
          <nav className="hidden md:flex space-x-8">
            {["Home", "Bikes", "About", "Contact"].map((item, index) => (
              <motion.a
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`relative transition-colors ${item === "Home" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
                {item === "Home" && (
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                    layoutId="navbar-indicator"
                  />
                )}
              </motion.a>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <motion.div 
                className="flex items-center space-x-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="text-sm text-foreground">Welcome back!</span>
                <Button variant="outline" size="sm" onClick={() => setUser(null)}>Logout</Button>
              </motion.div>
            ) : (
              <motion.div 
                className="flex space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Button variant="ghost" size="sm" asChild>
                  <a href="/login">Login</a>
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25 transition-all duration-300" asChild>
                  <a href="/signup">Sign Up</a>
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-background"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(34,197,94,0.3), rgba(251,146,60,0.2), rgba(15,23,42,1))",
                "linear-gradient(90deg, rgba(34,197,94,0.2), rgba(251,146,60,0.3), rgba(15,23,42,1))",
                "linear-gradient(135deg, rgba(34,197,94,0.3), rgba(251,146,60,0.2), rgba(15,23,42,1))"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div style={{ y: y1 }} className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <motion.div style={{ y: y2 }} className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
                    🚀 #1 Bike Rental Platform in India
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-6xl md:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-foreground">Ride the</span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                    Future
                  </span>
                  <br />
                  <span className="text-foreground">Today</span>
                </motion.h1>

                <motion.p
                  className="text-xl text-muted-foreground max-w-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Experience premium bikes across India. From daily commutes to weekend adventures, 
                  find your perfect ride with cutting-edge technology and unmatched convenience.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 h-14 px-8"
                    asChild
                  >
                    <a href="/bikes" className="flex items-center">
                      <Search className="w-5 h-5 mr-2" />
                      Explore Bikes
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="h-14 px-8 hover:bg-primary/10 hover:border-primary transition-all duration-300"
                    onClick={() => setHeroVideoPlaying(true)}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Button>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {animatedStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                    >
                      <motion.div 
                        className="text-3xl font-bold text-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + index * 0.1 }}
                      >
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5 + index * 0.1 }}
                        >
                          {stat.value.toLocaleString()}{stat.suffix}
                        </motion.span>
                      </motion.div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content - Interactive Search */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl"
                whileHover={{ y: -5, shadow: "0 25px 50px rgba(34,197,94,0.15)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl" />
                
                <div className="relative space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Find Your Perfect Ride</h3>
                    <p className="text-muted-foreground">Book instantly with smart recommendations</p>
                  </div>

                  <div className="space-y-4">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <MapPin className="absolute left-4 top-4 w-5 h-5 text-primary z-10" />
                      <Input
                        placeholder="Where do you want to ride?"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="pl-12 h-14 bg-background/80 border-border/50 rounded-xl text-lg focus:ring-2 focus:ring-primary/20"
                      />
                    </motion.div>

                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                    >
                      <Input
                        type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        className="h-14 bg-background/80 border-border/50 rounded-xl text-lg focus:ring-2 focus:ring-primary/20"
                      />
                    </motion.div>

                    <Button 
                      size="lg" 
                      className="w-full h-14 bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 text-lg"
                      asChild
                    >
                      <a href="/bikes">
                        <Search className="w-5 h-5 mr-2" />
                        Search Available Bikes
                      </a>
                    </Button>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="grid grid-cols-3 gap-3 pt-4">
                    {[
                      { icon: Zap, label: "Instant", color: "text-yellow-500" },
                      { icon: Shield, label: "Secure", color: "text-green-500" },
                      { icon: Clock, label: "24/7", color: "text-blue-500" }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        className="text-center p-3 rounded-xl bg-background/50 hover:bg-background/80 transition-all cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <item.icon className={`w-6 h-6 mx-auto mb-1 ${item.color}`} />
                        <div className="text-xs text-muted-foreground">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-primary rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              ✨ Why Choose RideEasy
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Experience the <span className="text-primary">Difference</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We've revolutionized bike rentals with technology, safety, and unmatched customer service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Instant Booking", desc: "Book in seconds with our smart platform", color: "text-yellow-500" },
              { icon: Shield, title: "100% Secure", desc: "Advanced security for all transactions", color: "text-green-500" },
              { icon: Clock, title: "24/7 Support", desc: "Round-the-clock assistance when you need it", color: "text-blue-500" },
              { icon: Award, title: "Premium Quality", desc: "Top-rated bikes from trusted partners", color: "text-purple-500" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-background flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              📱 See It In Action
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Experience <span className="text-primary">RideEasy</span> Live
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Watch real demonstrations of our platform in action. See how easy it is to find,
              book, and ride your perfect bike.
            </p>
          </motion.div>

          {/* Demo Video Tabs */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden">
              <CardContent className="p-0">
                {/* Video Tab Navigation */}
                <div className="border-b border-border/50">
                  <div className="flex flex-wrap justify-center">
                    {Object.entries(videoContent).map(([key, video]) => (
                      <button
                        key={key}
                        onClick={() => setActiveVideoTab(key)}
                        className={`relative px-6 py-4 text-sm font-medium transition-all duration-300 ${
                          activeVideoTab === key
                            ? 'text-primary bg-primary/5'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        {video.title}
                        {activeVideoTab === key && (
                          <motion.div
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                            layoutId="activeTab"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Video Content */}
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeVideoTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="grid lg:grid-cols-2 gap-8 items-center"
                    >
                      {/* Video Thumbnail */}
                      <motion.div
                        className="relative group cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setHeroVideoPlaying(true)}
                      >
                        <div className="relative aspect-video rounded-xl overflow-hidden">
                          <img
                            src={videoContent[activeVideoTab].thumbnail}
                            alt={videoContent[activeVideoTab].title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                            <motion.div
                              className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Play className="w-6 h-6 text-primary ml-1" />
                            </motion.div>
                          </div>
                          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                            {videoContent[activeVideoTab].duration}
                          </div>
                        </div>
                      </motion.div>

                      {/* Video Info */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-3">
                            {videoContent[activeVideoTab].title}
                          </h3>
                          <p className="text-muted-foreground text-lg leading-relaxed">
                            {videoContent[activeVideoTab].description}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-foreground">What you'll learn:</h4>
                          <div className="grid gap-3">
                            {activeVideoTab === 'booking' && (
                              <>
                                <div className="flex items-center space-x-3">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  <span className="text-muted-foreground">Search and filter bikes by your preferences</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  <span className="text-muted-foreground">Complete booking in under 60 seconds</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  <span className="text-muted-foreground">Secure payment and instant confirmation</span>
                                </div>
                              </>
                            )}
                            {activeVideoTab === 'features' && (
                              <>
                                <div className="flex items-center space-x-3">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  <span className="text-muted-foreground">GPS tracking and live location sharing</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  <span className="text-muted-foreground">In-app customer support and emergency help</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  <span className="text-muted-foreground">Smart recommendations based on your usage</span>
                                </div>
                              </>
                            )}
                            {activeVideoTab === 'safety' && (
                              <>
                                <div className="flex items-center space-x-3">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  <span className="text-muted-foreground">Essential safety gear and guidelines</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  <span className="text-muted-foreground">Emergency procedures and contacts</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  <span className="text-muted-foreground">Best practices for safe riding</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <Button
                          className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25"
                          onClick={() => setHeroVideoPlaying(true)}
                        >
                          <PlayCircle className="w-5 h-5 mr-2" />
                          Watch Full Demo
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* App Screenshots Carousel */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Mobile App Experience
              </h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our award-winning mobile app makes bike rental effortless across all devices
              </p>
            </div>

            <div className="relative">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Device Mockups */}
                    <div className="relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentDemoSlide}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.5 }}
                          className="relative"
                        >
                          <div className="relative mx-auto w-full max-w-sm">
                            {/* Phone Frame */}
                            <div className="relative bg-card border-2 border-border rounded-[3rem] p-3 shadow-2xl">
                              <div className="bg-background rounded-[2.5rem] overflow-hidden">
                                <img
                                  src={demoSlides[currentDemoSlide].image}
                                  alt={demoSlides[currentDemoSlide].title}
                                  className="w-full h-[600px] object-cover"
                                />
                              </div>
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                              className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
                              animate={{ y: [0, -10, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Smartphone className="w-4 h-4 text-primary-foreground" />
                            </motion.div>

                            <motion.div
                              className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation Dots */}
                      <div className="flex justify-center space-x-2 mt-8">
                        {demoSlides.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentDemoSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === currentDemoSlide ? 'bg-primary scale-125' : 'bg-muted-foreground/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Feature Description */}
                    <div className="space-y-8">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentDemoSlide}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-2xl font-bold text-foreground mb-3">
                                {demoSlides[currentDemoSlide].title}
                              </h4>
                              <p className="text-muted-foreground text-lg leading-relaxed">
                                {demoSlides[currentDemoSlide].description}
                              </p>
                            </div>

                            <div className="space-y-3">
                              {demoSlides[currentDemoSlide].features.map((feature, index) => (
                                <motion.div
                                  key={feature}
                                  className="flex items-center space-x-3"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                  <span className="text-muted-foreground">{feature}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Download Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <motion.a
                          href="#"
                          className="flex items-center justify-center space-x-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img src="/api/placeholder/24/24" alt="App Store" className="w-6 h-6" />
                          <div className="text-left">
                            <div className="text-xs">Download on the</div>
                            <div className="text-sm font-semibold">App Store</div>
                          </div>
                        </motion.a>

                        <motion.a
                          href="#"
                          className="flex items-center justify-center space-x-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img src="/api/placeholder/24/24" alt="Google Play" className="w-6 h-6" />
                          <div className="text-left">
                            <div className="text-xs">Get it on</div>
                            <div className="text-sm font-semibold">Google Play</div>
                          </div>
                        </motion.a>
                      </div>

                      {/* Navigation Arrows */}
                      <div className="flex space-x-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentDemoSlide((prev) =>
                            prev === 0 ? demoSlides.length - 1 : prev - 1
                          )}
                          className="hover:bg-primary/10 hover:border-primary/50"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentDemoSlide((prev) =>
                            (prev + 1) % demoSlides.length
                          )}
                          className="hover:bg-primary/10 hover:border-primary/50"
                        >
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Live Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              { label: "Active Users", value: "2,847", trend: "+12%", icon: Users },
              { label: "Rides Today", value: "156", trend: "+8%", icon: Bike },
              { label: "Cities Live", value: "25", trend: "+2", icon: MapPin },
              { label: "Satisfaction", value: "4.9", trend: "+0.1", icon: Star }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-card/80 backdrop-blur-sm border-border/50 text-center">
                  <CardContent className="pt-6">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                    <div className="text-xs text-green-500">{stat.trend}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Bikes with Enhanced Interactivity */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
              🏍️ Premium Collection
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Bikes</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Handpicked bikes from our premium collection. Ready to ride, whenever you are.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBikes.map((bike, index) => (
              <motion.div
                key={bike.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <Card className="overflow-hidden bg-card/80 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={bike.image}
                      alt={bike.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute top-4 right-4 space-y-2">
                      <Badge variant={bike.available ? "default" : "secondary"} className="bg-background/90 backdrop-blur-sm">
                        {bike.available ? "Available" : "Booked"}
                      </Badge>
                    </div>

                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center space-x-2 text-white text-sm">
                        <Users className="w-4 h-4" />
                        <span>{bike.reviews} reviews</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {bike.name}
                        </h3>
                        <div className="flex items-center text-muted-foreground text-sm mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {bike.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <motion.div 
                          className="text-2xl font-bold text-primary"
                          whileHover={{ scale: 1.1 }}
                        >
                          {bike.price}
                        </motion.div>
                        <div className="text-xs text-muted-foreground">/day</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium ml-1">{bike.rating}</span>
                        <span className="text-xs text-muted-foreground ml-1">({bike.reviews})</span>
                      </div>
                      <div className="flex gap-2">
                        {bike.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className={`w-full transition-all duration-300 ${
                          bike.available 
                            ? 'bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25' 
                            : 'unavailable-button'
                        }`}
                        disabled={!bike.available}
                        variant={bike.available ? "default" : "secondary"}
                        onClick={() => handleBookNow(bike)}
                      >
                        {bike.available ? (
                          <>
                            Book Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        ) : (
                          "Not Available"
                        )}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              💬 Customer Love
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">What Our Riders Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust RideEasy for their mobility needs
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Card className="bg-card/80 border-border/50 p-8 mb-8">
                  <CardContent className="space-y-6">
                    <div className="flex justify-center space-x-1">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-xl text-foreground italic leading-relaxed">
                      "{testimonials[currentTestimonial].text}"
                    </blockquote>
                    <div className="flex items-center justify-center space-x-4">
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <div className="font-semibold text-foreground">
                          {testimonials[currentTestimonial].name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonials[currentTestimonial].location}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-primary scale-125' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Locations with Growth Indicators */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
              📍 Expanding Network
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Popular Locations</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore bikes available across major cities in India with growing demand
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="group cursor-pointer"
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:shadow-primary/20 bg-card/80 border-border/50 hover:border-primary/50">
                  <CardContent className="pt-6 relative overflow-hidden">
                    <motion.div
                      className="absolute top-2 right-2 text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {location.growth}
                    </motion.div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {location.name}
                    </h3>
                    <motion.p 
                      className="text-primary font-bold"
                      whileHover={{ scale: 1.1 }}
                    >
                      {location.bikes}+ bikes
                    </motion.p>
                    <div className="flex items-center justify-center mt-2 text-xs text-muted-foreground">
                      <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                      Growing fast
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tourist Destinations Section */}
      <section className="py-20 bg-gradient-to-br from-accent/5 via-background to-primary/5 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
              🏔️ Top Destinations
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Explore India's Most <span className="text-accent">Beautiful Destinations</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              From scenic mountain roads to coastal highways, discover India's most breathtaking
              destinations perfect for your next bike adventure.
            </p>
          </motion.div>

          {/* Featured Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Ladakh",
                state: "Jammu & Kashmir",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
                description: "The Land of High Passes - Experience the ultimate adventure on world's highest motorable roads",
                highlights: ["Khardung La Pass", "Pangong Lake", "Nubra Valley", "Magnetic Hill"],
                bestTime: "May - September",
                difficulty: "Expert",
                distance: "1,200 km from Delhi",
                bikes: 45,
                rating: 4.9,
                price: "₹2,500/day"
              },
              {
                name: "Manali to Leh",
                state: "Himachal Pradesh to Ladakh",
                image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80",
                description: "One of the world's most scenic highways through the mighty Himalayas",
                highlights: ["Rohtang Pass", "Baralacha La", "Sarchu Plains", "Tanglang La"],
                bestTime: "June - September",
                difficulty: "Advanced",
                distance: "425 km",
                bikes: 38,
                rating: 4.8,
                price: "₹2,000/day"
              },
              {
                name: "Goa Coastline",
                state: "Goa",
                image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
                description: "Cruise along pristine beaches and experience Goa's vibrant culture",
                highlights: ["Baga Beach", "Anjuna Cliffs", "Dudhsagar Falls", "Old Goa Churches"],
                bestTime: "October - March",
                difficulty: "Beginner",
                distance: "150 km coastal route",
                bikes: 62,
                rating: 4.6,
                price: "₹800/day"
              },
              {
                name: "Kerala Backwaters",
                state: "Kerala",
                image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
                description: "Ride through God's Own Country with lush greenery and serene backwaters",
                highlights: ["Alleppey Backwaters", "Munnar Hills", "Thekkady Wildlife", "Kochi Heritage"],
                bestTime: "September - March",
                difficulty: "Beginner",
                distance: "400 km circuit",
                bikes: 55,
                rating: 4.7,
                price: "₹1,200/day"
              },
              {
                name: "Rajasthan Desert Circuit",
                state: "Rajasthan",
                image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80",
                description: "Journey through royal palaces, golden deserts, and vibrant culture",
                highlights: ["Jaisalmer Fort", "Thar Desert", "Jaipur Palaces", "Udaipur Lakes"],
                bestTime: "October - March",
                difficulty: "Intermediate",
                distance: "800 km circuit",
                bikes: 42,
                rating: 4.5,
                price: "₹1,100/day"
              },
              {
                name: "Northeast Explorer",
                state: "Sikkim & Arunachal Pradesh",
                image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
                description: "Discover India's hidden gems in the mystical Northeast",
                highlights: ["Tsomgo Lake", "Nathu La Pass", "Tawang Monastery", "Ziro Valley"],
                bestTime: "March - May, September - November",
                difficulty: "Advanced",
                distance: "600 km circuit",
                bikes: 28,
                rating: 4.8,
                price: "₹1,800/day"
              }
            ].map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <Card className="overflow-hidden bg-card/80 border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 h-full">
                  <div className="relative overflow-hidden h-48">
                    <motion.img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Difficulty Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="outline"
                        className={`bg-background/90 backdrop-blur-sm text-xs ${
                          destination.difficulty === 'Expert' ? 'border-red-500 text-red-500' :
                          destination.difficulty === 'Advanced' ? 'border-orange-500 text-orange-500' :
                          destination.difficulty === 'Intermediate' ? 'border-yellow-500 text-yellow-500' :
                          'border-green-500 text-green-500'
                        }`}
                      >
                        {destination.difficulty}
                      </Badge>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent/90 text-accent-foreground backdrop-blur-sm">
                        {destination.price}
                      </Badge>
                    </div>

                    {/* Location & Rating */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                      <div className="flex items-center text-sm opacity-90">
                        <MapPin className="w-3 h-3 mr-1" />
                        {destination.state}
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4 flex items-center text-white">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col">
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {destination.description}
                    </p>

                    {/* Key Info */}
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mb-4">
                      <div>
                        <span className="font-medium">Best Time:</span>
                        <br />
                        {destination.bestTime}
                      </div>
                      <div>
                        <span className="font-medium">Distance:</span>
                        <br />
                        {destination.distance}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-foreground mb-2">Must Visit:</h4>
                      <div className="flex flex-wrap gap-1">
                        {destination.highlights.slice(0, 2).map((highlight) => (
                          <Badge key={highlight} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                        {destination.highlights.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{destination.highlights.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{destination.bikes} bikes available</span>
                        <div className="flex items-center">
                          <Bike className="w-4 h-4 text-primary mr-1" />
                          <span className="text-primary font-medium">Ready to ride</span>
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className="w-full bg-gradient-to-r from-accent to-primary hover:shadow-lg hover:shadow-accent/25"
                          asChild
                        >
                          <a href="/bikes">
                            Explore Bikes
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Route Planner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-primary/20 p-8 max-w-2xl mx-auto">
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Plan Your Perfect Route
                  </h3>
                  <p className="text-muted-foreground">
                    Get personalized route recommendations based on your experience level and preferences
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 hover:bg-primary/10 hover:border-primary/50"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Route Planner
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 hover:bg-accent/10 hover:border-accent/50"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Group Tours
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  ✨ AI-powered recommendations • 🛡️ Safety-first routing • 📱 Mobile offline maps
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              🗺️ Real-time Availability
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Live Bike Tracking</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              See real-time bike availability across India with our interactive map
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <IndiaMap />
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-primary/20 p-12">
              <CardContent className="space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                </motion.div>
                
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Stay Updated with RideEasy
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Get the latest updates on new bikes, special offers, and exclusive deals delivered to your inbox
                </p>
                
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Input
                    placeholder="Enter your email"
                    className="flex-1 h-12 bg-background border-border"
                  />
                  <Button className="h-12 px-8 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25">
                    Subscribe
                  </Button>
                </motion.div>
                
                <p className="text-xs text-muted-foreground">
                  No spam, unsubscribe at any time. Your privacy is important to us.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Need Help?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Our support team is here to assist you 24/7. Get in touch with us anytime!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {[
                { icon: Phone, label: "Call Us", value: "+91 98765 43210", href: "tel:+919876543210" },
                { icon: MessageCircle, label: "Live Chat", value: "Start Chat", href: "#" },
                { icon: Mail, label: "Email Us", value: "support@rideeasy.com", href: "mailto:support@rideeasy.com" }
              ].map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  className="flex items-center space-x-3 bg-card hover:bg-card/80 border border-border hover:border-primary/50 rounded-xl p-4 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <contact.icon className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <div className="text-sm text-muted-foreground">{contact.label}</div>
                    <div className="font-medium text-foreground">{contact.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <motion.div 
                className="flex items-center space-x-3 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Bike className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  RideEasy
                </h3>
              </motion.div>
              <p className="text-muted-foreground text-sm mb-4">
                Your trusted partner for bike rentals across India. 
                Safe, secure, and always reliable.
              </p>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Verified Platform</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["About Us", "Our Fleet", "Locations", "Contact"].map((link) => (
                  <motion.li key={link} whileHover={{ x: 5 }}>
                    <a href="#" className="hover:text-primary transition-colors">{link}</a>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Help Center", "Safety", "Insurance", "Terms & Conditions"].map((link) => (
                  <motion.li key={link} whileHover={{ x: 5 }}>
                    <a href="#" className="hover:text-primary transition-colors">{link}</a>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@rideeasy.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>24/7 Customer Support</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Available across India</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div
            className="border-t border-border pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground">
              &copy; 2024 RideEasy. All rights reserved. Made with{" "}
              <motion.span
                className="text-red-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ❤️
              </motion.span>{" "}
              in India
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
        onAuthSuccess={(userData) => setUser(userData)}
      />

      <PaymentModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        bookingData={selectedBike}
        onPaymentSuccess={() => {
          console.log('Payment successful!');
          setSelectedBike(null);
        }}
      />

      {/* Enhanced Video Modal */}
      <AnimatePresence>
        {heroVideoPlaying && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setHeroVideoPlaying(false)}
          >
            <motion.div
              className="bg-card rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Header */}
              <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">RideEasy Demo</h3>
                    <p className="text-white/80">See how easy bike rental can be</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setHeroVideoPlaying(false)}
                    className="text-white hover:bg-white/20"
                  >
                    ✕
                  </Button>
                </div>
              </div>

              {/* Video Content */}
              <div className="p-6">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg relative overflow-hidden mb-6">
                  {/* Video Placeholder with Interactive Elements */}
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                    alt="Demo video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <motion.div
                      className="text-center text-white"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.div
                        className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </motion.div>
                      <p className="text-lg font-semibold mb-2">RideEasy Platform Demo</p>
                      <p className="text-white/80">Duration: 3:45</p>
                    </motion.div>
                  </div>

                  {/* Video Progress Bar */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 rounded-full h-1">
                      <motion.div
                        className="bg-white h-1 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "35%" }}
                        transition={{ duration: 2, delay: 1 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Video Description */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">What you'll see:</h4>
                    <div className="space-y-2">
                      {[
                        "Quick bike search and filtering",
                        "Seamless booking process",
                        "Secure payment options",
                        "Real-time bike tracking",
                        "Customer support features"
                      ].map((item, index) => (
                        <motion.div
                          key={item}
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Benefits:</h4>
                    <div className="space-y-2">
                      {[
                        "Book in under 60 seconds",
                        "Available 24/7 nationwide",
                        "Premium bikes, affordable prices",
                        "Complete safety assurance",
                        "Instant customer support"
                      ].map((item, index) => (
                        <motion.div
                          key={item}
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25"
                    asChild
                  >
                    <a href="/bikes">
                      <Search className="w-4 h-4 mr-2" />
                      Start Exploring Bikes
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    asChild
                  >
                    <a href="/signup">
                      <Users className="w-4 h-4 mr-2" />
                      Create Free Account
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
