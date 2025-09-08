/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Bike rental API types
 */
export interface Bike {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  features: string[];
  available: boolean;
  type: string;
  brand: string;
  description?: string;
  specifications?: {
    engine: string;
    mileage: string;
    fuelCapacity: string;
    weight: string;
  };
}

export interface BikeSearchRequest {
  location?: string;
  type?: string;
  brand?: string;
  priceMin?: number;
  priceMax?: number;
  available?: boolean;
  sortBy?: 'price' | 'rating' | 'name';
}

export interface BikeSearchResponse {
  bikes: Bike[];
  total: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  verified: boolean;
  createdAt: string;
}

export interface AuthRequest {
  phone: string;
}

export interface OTPVerificationRequest {
  phone: string;
  otp: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface BookingRequest {
  bikeId: number;
  startDate: string;
  endDate: string;
  userId: number;
  location: string;
}

export interface Booking {
  id: number;
  bikeId: number;
  userId: number;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  bike?: Bike;
  user?: User;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  booking?: Booking;
}

export interface PaymentRequest {
  bookingId: number;
  amount: number;
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'wallet';
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  paymentId?: string;
  paymentUrl?: string;
}

export interface LocationAvailability {
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

export interface MapDataResponse {
  locations: LocationAvailability[];
}
