import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bike, Users, Shield, Clock, Award, MapPin, 
  Phone, Mail, Star, CheckCircle, Target, Heart,
  Zap, Globe, TrendingUp
} from "lucide-react";

export default function About() {
  const stats = [
    { label: "Happy Customers", value: "50,000+", icon: Users },
    { label: "Cities Covered", value: "25+", icon: MapPin },
    { label: "Bikes Available", value: "5,000+", icon: Bike },
    { label: "Years of Experience", value: "5+", icon: Award }
  ];

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Every bike undergoes rigorous safety checks and maintenance before rental."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you whenever you need help."
    },
    {
      icon: Star,
      title: "Quality Assurance",
      description: "Premium bikes from trusted brands, regularly serviced and maintained."
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Book your ride in seconds with our streamlined booking process."
    },
    {
      icon: Globe,
      title: "Pan-India Coverage",
      description: "Available across major cities in India with expanding network."
    },
    {
      icon: Heart,
      title: "Customer Centric",
      description: "Your satisfaction is our priority. We go extra mile for happy customers."
    }
  ];

  const team = [
    {
      name: "Kunal Kumar",
      role: "Founder & CEO",
      image: "https://cdn.builder.io/api/v1/image/assets%2F51218e8445d94a61bcf324c702b7ca69%2Fd823f047435740d9849da8fa80a313bd",
      description: "Passionate about sustainable transportation and technology innovation."
    },
    {
      name: "Mrinal Kumar",
      role: "CTO",
      image: "https://cdn.builder.io/api/v1/image/assets%2F51218e8445d94a61bcf324c702b7ca69%2F43e74f864266447cbbe631967e1e3ed2",
      description: "Leading our technology team to build world-class rental solutions."
    },
    {
      name: "Amit Singh",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
      description: "Ensuring smooth operations and excellent customer experience nationwide."
    }
  ];

  const milestones = [
    { year: "2019", event: "RideEasy Founded", description: "Started with 10 bikes in Mumbai" },
    { year: "2020", event: "First 1000 Customers", description: "Achieved our first major milestone" },
    { year: "2021", event: "Multi-City Expansion", description: "Expanded to 5 major cities" },
    { year: "2022", event: "10,000+ Rides", description: "Completed 10,000 successful rides" },
    { year: "2023", event: "Tech Innovation", description: "Launched mobile app and AI-powered matching" },
    { year: "2024", event: "50,000+ Users", description: "Serving 50,000+ happy customers across India" }
  ];

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
            <a href="/about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
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
              About <span className="text-primary">RideEasy</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Revolutionizing bike rentals in India with technology, safety, and exceptional customer service. 
              Your trusted partner for urban mobility solutions.
            </p>
            <div className="flex justify-center">
              <Badge variant="outline" className="text-lg px-6 py-2">
                Serving India Since 2019
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center bg-card border-border">
                    <CardContent className="pt-6">
                      <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                      <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8">
                <div>
                  <div className="flex items-center mb-4">
                    <Target className="w-6 h-6 text-primary mr-3" />
                    <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To provide safe, reliable, and affordable bike rental services across India, 
                    making urban transportation accessible to everyone while promoting sustainable mobility.
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary mr-3" />
                    <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To become India's most trusted bike rental platform, revolutionizing urban mobility 
                    through technology innovation and exceptional customer experience.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                alt="Bike rental service"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl">
                <div className="text-2xl font-bold">5+ Years</div>
                <div className="text-sm">Of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-card border-border hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <Icon className="w-12 h-12 text-primary mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The passionate people behind RideEasy's success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center bg-card border-border">
                  <CardContent className="p-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Key milestones in our mission to transform bike rentals in India
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-center gap-6 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                >
                  <div className="flex-1">
                    <Card className="bg-card border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-primary">
                            {milestone.year}
                          </Badge>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.event}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0"></div>
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Ride with Us?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust RideEasy for their daily commute and adventure needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/bikes"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Browse Bikes
              </a>
              <a
                href="/contact"
                className="border border-border hover:bg-muted/50 text-foreground px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 RideEasy. All rights reserved. Making mobility accessible to everyone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
