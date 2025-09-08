import { RequestHandler } from "express";
import { BookingRequest, Booking, BookingResponse, PaymentRequest, PaymentResponse } from "@shared/api";

// Mock booking storage
const mockBookings: Booking[] = [];

export const createBooking: RequestHandler = (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: "Authorization token required"
    } as BookingResponse);
  }

  const { bikeId, startDate, endDate, location }: BookingRequest = req.body;

  if (!bikeId || !startDate || !endDate || !location) {
    return res.status(400).json({
      success: false,
      message: "Missing required booking information"
    } as BookingResponse);
  }

  // Validate dates
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  if (start < now) {
    return res.status(400).json({
      success: false,
      message: "Start date cannot be in the past"
    } as BookingResponse);
  }

  if (end <= start) {
    return res.status(400).json({
      success: false,
      message: "End date must be after start date"
    } as BookingResponse);
  }

  // Calculate duration and amount (simplified calculation)
  const durationMs = end.getTime() - start.getTime();
  const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
  const bikePrice = getBikePriceById(bikeId); // Mock function
  const totalAmount = durationDays * bikePrice;

  // Extract user ID from token (simplified)
  const token = authHeader.substring(7);
  const decoded = Buffer.from(token, 'base64').toString();
  const [userId] = decoded.split(':');

  const booking: Booking = {
    id: mockBookings.length + 1,
    bikeId,
    userId: parseInt(userId),
    startDate,
    endDate,
    totalAmount,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: new Date().toISOString()
  };

  mockBookings.push(booking);

  res.json({
    success: true,
    message: "Booking created successfully",
    booking
  } as BookingResponse);
};

export const getUserBookings: RequestHandler = (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: "Authorization token required"
    });
  }

  const token = authHeader.substring(7);
  const decoded = Buffer.from(token, 'base64').toString();
  const [userId] = decoded.split(':');

  const userBookings = mockBookings.filter(b => b.userId === parseInt(userId));

  res.json({
    success: true,
    bookings: userBookings
  });
};

export const getBookingById: RequestHandler = (req, res) => {
  const bookingId = parseInt(req.params.id);
  const booking = mockBookings.find(b => b.id === bookingId);

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found"
    });
  }

  res.json({
    success: true,
    booking
  });
};

export const cancelBooking: RequestHandler = (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: "Authorization token required"
    });
  }

  const bookingId = parseInt(req.params.id);
  const booking = mockBookings.find(b => b.id === bookingId);

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found"
    } as BookingResponse);
  }

  const token = authHeader.substring(7);
  const decoded = Buffer.from(token, 'base64').toString();
  const [userId] = decoded.split(':');

  if (booking.userId !== parseInt(userId)) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to cancel this booking"
    } as BookingResponse);
  }

  booking.status = 'cancelled';

  res.json({
    success: true,
    message: "Booking cancelled successfully",
    booking
  } as BookingResponse);
};

export const processPayment: RequestHandler = (req, res) => {
  const { bookingId, amount, paymentMethod }: PaymentRequest = req.body;

  if (!bookingId || !amount || !paymentMethod) {
    return res.status(400).json({
      success: false,
      message: "Missing payment information"
    } as PaymentResponse);
  }

  const booking = mockBookings.find(b => b.id === bookingId);

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found"
    } as PaymentResponse);
  }

  if (booking.paymentStatus === 'paid') {
    return res.status(400).json({
      success: false,
      message: "Payment already completed"
    } as PaymentResponse);
  }

  // Simulate payment processing
  const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Update booking status
  booking.paymentStatus = 'paid';
  booking.status = 'confirmed';

  res.json({
    success: true,
    message: "Payment processed successfully",
    paymentId
  } as PaymentResponse);
};

// Helper function to get bike price (mock)
function getBikePriceById(bikeId: number): number {
  const bikePrices: { [key: number]: number } = {
    1: 1000, // Royal Enfield Classic 350
    2: 500, // Honda Activa 6G
    3: 1200, // KTM Duke 390
    4: 900, // Bajaj Pulsar N250
    5: 500, // TVS Jupiter
    6: 500  // Hero Splendor Plus
  };

  return bikePrices[bikeId] || 500; // Default price
}
