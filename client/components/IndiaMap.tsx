import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bike } from "lucide-react";
import { motion } from "framer-motion";

interface LocationData {
  city: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  availableBikes: number;
  totalBikes: number;
  popularBikes: string[];
}

export default function IndiaMap() {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMapData();
  }, []);

  const fetchMapData = async () => {
    try {
      const response = await fetch('/api/map/data');
      const data = await response.json();
      setLocations(data.locations);
    } catch (error) {
      console.error('Failed to fetch map data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Normalize coordinates for SVG display (simplified India outline)
  const normalizeCoords = (lat: number, lng: number) => {
    // Rough bounds for India: lat 8-37, lng 68-97
    const x = ((lng - 68) / (97 - 68)) * 600 + 50;
    const y = ((37 - lat) / (37 - 8)) * 400 + 50;
    return { x, y };
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.7) return "#22c55e"; // Green
    if (ratio > 0.4) return "#f59e0b"; // Orange
    return "#ef4444"; // Red
  };

  if (loading) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Bike Availability Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            Bike Availability Across India
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="relative bg-muted/20 rounded-lg overflow-hidden">
                <svg
                  viewBox="0 0 700 500"
                  className="w-full h-auto"
                  style={{ maxHeight: "400px" }}
                >
                  {/* Simplified India outline */}
                  <path
                    d="M150 100 L550 80 L580 150 L600 200 L590 280 L570 350 L500 380 L450 420 L350 430 L250 420 L200 380 L150 320 L130 250 L140 180 Z"
                    fill="hsl(var(--muted))"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                  />
                  
                  {/* Location markers */}
                  {locations.map((location, index) => {
                    const coords = normalizeCoords(location.coordinates.lat, location.coordinates.lng);
                    
                    return (
                      <motion.g
                        key={location.city}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <circle
                          cx={coords.x}
                          cy={coords.y}
                          r={Math.max(8, location.totalBikes / 10)}
                          fill={getAvailabilityColor(location.availableBikes, location.totalBikes)}
                          stroke="#fff"
                          strokeWidth="2"
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setSelectedLocation(location)}
                        />
                        <text
                          x={coords.x}
                          y={coords.y + 25}
                          textAnchor="middle"
                          className="fill-foreground text-xs font-medium"
                        >
                          {location.city}
                        </text>
                      </motion.g>
                    );
                  })}
                </svg>
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="text-muted-foreground">High Availability (70%+)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  <span className="text-muted-foreground">Medium (40-70%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span className="text-muted-foreground">Low (under 40%)</span>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="space-y-4">
              {selectedLocation ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-muted/50 border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground">{selectedLocation.city}</CardTitle>
                      <p className="text-muted-foreground">{selectedLocation.state}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">Available Bikes:</span>
                        <Badge variant="default" className="bg-primary">
                          {selectedLocation.availableBikes}/{selectedLocation.totalBikes}
                        </Badge>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Popular Bikes:</h4>
                        <div className="space-y-2">
                          {selectedLocation.popularBikes.map((bike) => (
                            <div key={bike} className="flex items-center space-x-2">
                              <Bike className="w-4 h-4 text-primary" />
                              <span className="text-sm text-muted-foreground">{bike}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Click on any city to view bike availability details</p>
                </div>
              )}

              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-primary/10 border-primary/20">
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {locations.reduce((sum, loc) => sum + loc.totalBikes, 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">Total Bikes</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-accent/10 border-accent/20">
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">
                        {locations.reduce((sum, loc) => sum + loc.availableBikes, 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">Available Now</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
