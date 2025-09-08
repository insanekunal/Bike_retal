import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MapPin, Star, Bike, Filter, SortAsc, Eye } from "lucide-react";
import { motion } from "framer-motion";
import BookingModal from "@/components/BookingModal";

const allBikes = [
  {
    id: 1,
    name: "Royal Enfield Classic 350",
    location: "Mumbai",
    price: 1000,
    rating: 4.8,
    image: "https://cdn.builder.io/api/v1/image/assets%2F51218e8445d94a61bcf324c702b7ca69%2F2bb6b62497af4e0480a47e1815233ea4",
    features: ["350cc", "Manual", "Petrol"],
    available: true,
    type: "Cruiser",
    brand: "Royal Enfield"
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
    brand: "Honda"
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
    brand: "KTM"
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
    brand: "Bajaj"
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
    brand: "TVS"
  },
  {
    id: 6,
    name: "Hero Splendor Plus",
    location: "Pune",
    price: 600,
    rating: 4.2,
    image: "https://cdn.builder.io/o/assets%2F51218e8445d94a61bcf324c702b7ca69%2Fec8f6cdb969b421fb156f72297d7b50b?alt=media&token=fa90e95b-934a-4de2-ad57-acd05df1a4a5&apiKey=51218e8445d94a61bcf324c702b7ca69",
    features: ["97cc", "Manual", "Petrol"],
    available: true,
    type: "Commuter",
    brand: "Hero"
  }
];

export default function Bikes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2500]);
  const [sortBy, setSortBy] = useState("price");
  const [showFilters, setShowFilters] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);

  const locations = ["all", "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Goa", "Manali", "Ladakh", "Rajasthan", "Kerala", "Himachal Pradesh", "Uttarakhand", "Kashmir", "Shimla", "Leh", "Spiti Valley", "Darjeeling", "Ooty", "Mussoorie", "Nainital"];
  const types = ["all", "Sports", "Cruiser", "Scooter", "Commuter", "Adventure", "Touring"];
  const brands = ["all", "Royal Enfield", "Honda", "KTM", "Bajaj", "TVS", "Hero", "Yamaha", "Kawasaki", "BMW"];

  const filteredBikes = allBikes.filter(bike => {
    const matchesSearch = bike.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bike.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === "all" || bike.location === selectedLocation;
    const matchesType = selectedType === "all" || bike.type === selectedType;
    const matchesBrand = selectedBrand === "all" || bike.brand === selectedBrand;
    const matchesPrice = bike.price >= priceRange[0] && bike.price <= priceRange[1];

    return matchesSearch && matchesLocation && matchesType && matchesBrand && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
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
            <a href="/bikes" className="text-foreground hover:text-primary transition-colors">Bikes</a>
            <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/login">Login</a>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
              <a href="/signup">Sign Up</a>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
                  <Input
                    placeholder="Search bikes or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>
                          {location === "all" ? "All Locations" : location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Type */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map(type => (
                        <SelectItem key={type} value={type}>
                          {type === "all" ? "All Types" : type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Brand */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Brand</label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>
                          {brand === "all" ? "All Brands" : brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]} per day
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={2500}
                    min={0}
                    step={100}
                    className="mt-3"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header with sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Available Bikes</h1>
                <p className="text-muted-foreground">
                  {filteredBikes.length} bikes found
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <div className="flex items-center gap-2">
                  <SortAsc className="w-4 h-4 text-muted-foreground" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price">Price: Low to High</SelectItem>
                      <SelectItem value="rating">Rating: High to Low</SelectItem>
                      <SelectItem value="name">Name: A to Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Bikes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBikes.map((bike, index) => (
                <motion.div
                  key={bike.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bike-card-hover bg-card border-border overflow-hidden">
                    <div className="relative">
                      <img 
                        src={bike.image} 
                        alt={bike.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant={bike.available ? "default" : "secondary"} className="bg-background/80 backdrop-blur-sm">
                          {bike.available ? "Available" : "Booked"}
                        </Badge>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-xs">
                          {bike.type}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-foreground">{bike.name}</CardTitle>
                          <div className="flex items-center text-muted-foreground text-sm mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {bike.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">₹{bike.price}</div>
                          <div className="text-xs text-muted-foreground">/day</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium ml-1">{bike.rating}</span>
                        </div>
                        <div className="flex gap-2">
                          {bike.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          disabled={!bike.available}
                          variant={bike.available ? "default" : "secondary"}
                          onClick={() => {
                            if (bike.available) {
                              setSelectedBike(bike);
                              setShowBookingModal(true);
                            }
                          }}
                        >
                          {bike.available ? "Book Now" : "Not Available"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* No results */}
            {filteredBikes.length === 0 && (
              <div className="text-center py-16">
                <Bike className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No bikes found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        open={showBookingModal}
        onOpenChange={setShowBookingModal}
        bike={selectedBike}
        onBookingSuccess={() => {
          console.log('Booking completed successfully!');
          setSelectedBike(null);
        }}
      />
    </div>
  );
}
