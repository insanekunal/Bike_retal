import { RequestHandler } from "express";
import { LocationAvailability, MapDataResponse } from "@shared/api";

// Mock location data with Indian cities
const mockLocationData: LocationAvailability[] = [
  {
    city: "Mumbai",
    state: "Maharashtra",
    coordinates: { lat: 19.0760, lng: 72.8777 },
    availableBikes: 120,
    totalBikes: 150,
    popularBikes: ["Royal Enfield Classic 350", "Honda Activa 6G", "KTM Duke 390"]
  },
  {
    city: "Delhi",
    state: "Delhi",
    coordinates: { lat: 28.6139, lng: 77.2090 },
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
    coordinates: { lat: 17.3850, lng: 78.4867 },
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
    coordinates: { lat: 15.2993, lng: 74.1240 },
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

export const getMapData: RequestHandler = (req, res) => {
  // Simulate some dynamic availability changes
  const responseData = mockLocationData.map(location => ({
    ...location,
    availableBikes: Math.max(0, location.availableBikes - Math.floor(Math.random() * 10))
  }));

  const response: MapDataResponse = {
    locations: responseData
  };

  res.json(response);
};

export const getLocationData: RequestHandler = (req, res) => {
  const { city } = req.params;
  
  const location = mockLocationData.find(loc => 
    loc.city.toLowerCase() === city.toLowerCase()
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

export const searchNearbyLocations: RequestHandler = (req, res) => {
  const { lat, lng, radius = 100 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({
      success: false,
      message: "Latitude and longitude are required"
    });
  }

  const userLat = parseFloat(lat as string);
  const userLng = parseFloat(lng as string);
  const searchRadius = parseFloat(radius as string);

  // Simple distance calculation (Haversine formula simplified)
  const nearbyLocations = mockLocationData.filter(location => {
    const distance = calculateDistance(
      userLat, userLng,
      location.coordinates.lat, location.coordinates.lng
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

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
