import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

// Import bike rental API routes
import { getBikes, getBikeById, getFeaturedBikes } from "./routes/bikes";
import {
  requestOTP, verifyOTP, getUserProfile, updateProfile,
  loginWithEmail, completeSignup, verifyAadhar, verifyAadharOTP,
  verifyDL, verifyDLOTP, googleAuth, googleCallback, getAllUsers
} from "./routes/auth";
import { createBooking, getUserBookings, getBookingById, cancelBooking, processPayment } from "./routes/bookings";
import { getMapData, getLocationData, searchNearbyLocations } from "./routes/maps";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Bike routes
  app.get("/api/bikes", getBikes);
  app.get("/api/bikes/featured", getFeaturedBikes);
  app.get("/api/bikes/:id", getBikeById);

  // Authentication routes
  app.post("/api/auth/request-otp", requestOTP);
  app.post("/api/auth/verify-otp", verifyOTP);
  app.post("/api/auth/login", loginWithEmail);
  app.post("/api/auth/signup", completeSignup);
  app.post("/api/auth/verify-aadhar", verifyAadhar);
  app.post("/api/auth/verify-aadhar-otp", verifyAadharOTP);
  app.post("/api/auth/verify-dl", verifyDL);
  app.post("/api/auth/verify-dl-otp", verifyDLOTP);
  app.get("/api/auth/google", googleAuth);
  app.get("/api/auth/google/callback", googleCallback);
  app.get("/api/auth/users", getAllUsers);
  app.get("/api/auth/profile", getUserProfile);
  app.put("/api/auth/profile", updateProfile);

  // Booking routes
  app.post("/api/bookings", createBooking);
  app.get("/api/bookings", getUserBookings);
  app.get("/api/bookings/:id", getBookingById);
  app.delete("/api/bookings/:id", cancelBooking);

  // Payment routes
  app.post("/api/payments", processPayment);

  // Map and location routes
  app.get("/api/map/data", getMapData);
  app.get("/api/map/location/:city", getLocationData);
  app.get("/api/map/nearby", searchNearbyLocations);

  // Contact form route
  app.post("/api/contact", (req, res) => {
    const { name, email, phone, subject, category, message } = req.body;

    if (!name || !email || !subject || !category || !message) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled"
      });
    }

    // In production, save to database and send email
    console.log('Contact form submission:', { name, email, phone, subject, category, message });

    res.json({
      success: true,
      message: "Thank you for your message. We'll get back to you soon!"
    });
  });

  return app;
}
