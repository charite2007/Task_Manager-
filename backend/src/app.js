import express from "express";
import connectDB from "./config/db.js";
import routes from "./routes/task.routes.js";
import cors from "cors";

const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // Local frontend (Vite default)
  "http://localhost:3000", // Alternative local port
  process.env.FRONTEND_URL, // Production Vercel URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/task", routes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "✅ Backend is running" });
});

// Connect to database
try {
  await connectDB();
} catch (error) {
  console.error("❌ Failed to start server:", error.message);
  process.exit(1);
}

export default app;
