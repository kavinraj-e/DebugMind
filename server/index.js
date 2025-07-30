const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://thedebugmind.web.app",
];

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman) or from allowed list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Connect DB
connectDB();

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
