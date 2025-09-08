import { RequestHandler } from "express";
import { BikeSearchRequest, BikeSearchResponse, Bike } from "@shared/api";

// Mock bike data
const mockBikes: Bike[] = [
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

export const getBikes: RequestHandler = (req, res) => {
  const query = req.query as Partial<BikeSearchRequest>;
  
  let filteredBikes = [...mockBikes];

  // Apply filters
  if (query.location && query.location !== 'all') {
    filteredBikes = filteredBikes.filter(bike => 
      bike.location.toLowerCase().includes(query.location!.toLowerCase())
    );
  }

  if (query.type && query.type !== 'all') {
    filteredBikes = filteredBikes.filter(bike => bike.type === query.type);
  }

  if (query.brand && query.brand !== 'all') {
    filteredBikes = filteredBikes.filter(bike => bike.brand === query.brand);
  }

  if (query.priceMin !== undefined) {
    filteredBikes = filteredBikes.filter(bike => bike.price >= query.priceMin!);
  }

  if (query.priceMax !== undefined) {
    filteredBikes = filteredBikes.filter(bike => bike.price <= query.priceMax!);
  }

  if (query.available !== undefined) {
    filteredBikes = filteredBikes.filter(bike => bike.available === query.available);
  }

  // Apply sorting
  if (query.sortBy) {
    filteredBikes.sort((a, b) => {
      switch (query.sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }

  const response: BikeSearchResponse = {
    bikes: filteredBikes,
    total: filteredBikes.length
  };

  res.json(response);
};

export const getBikeById: RequestHandler = (req, res) => {
  const bikeId = parseInt(req.params.id);
  const bike = mockBikes.find(b => b.id === bikeId);

  if (!bike) {
    return res.status(404).json({ message: "Bike not found" });
  }

  res.json(bike);
};

export const getFeaturedBikes: RequestHandler = (req, res) => {
  const featuredBikes = mockBikes.filter(bike => bike.rating >= 4.5).slice(0, 6);
  res.json(featuredBikes);
};
