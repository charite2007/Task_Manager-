import express from "express";
import connectDB from "./config/db.js";
import routes from "./routes/task.routes.js";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
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
