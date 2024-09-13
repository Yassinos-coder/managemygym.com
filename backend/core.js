// Load environment variables from .env file
require("dotenv").config();

// Import required packages
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const hpp = require("hpp");
const fileUpload = require("express-fileupload");

// Initialize express app
const app = express();

// Security middlewares

// Helmet to set secure HTTP headers with custom options to further secure the app
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'unsafe-inline'"],
        "object-src": ["'none'"],
        "upgrade-insecure-requests": [],
      },
    },
    frameguard: { action: "deny" }, // Prevent clickjacking
    referrerPolicy: { policy: "no-referrer" }, // Avoid exposing referrer information
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, // Force HTTPS
  })
);

// CORS to allow or restrict cross-origin requests - add more restrictions if needed
app.use(
  cors({
    origin: ["http://localhost:5173"], // Replace with your frontend's domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Enable for cookie sharing
    optionsSuccessStatus: 200,
  })
);

// HPP to prevent HTTP Parameter Pollution attacks
app.use(hpp());

// Compression to reduce the size of the response body
app.use(compression());

// Limit repeated requests to public APIs and endpoints to prevent brute-force and DDoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
});
app.use(limiter);

// Parse incoming requests with JSON payloads and limit request size
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } })); // Set file upload limits

// Database connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.info("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
  });

// Catch-all route for undefined routes
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Start the server on port 8009
const PORT = 8009;
app.listen(PORT, () => {
  console.log(`Server running securely on port ${PORT}`);
});
