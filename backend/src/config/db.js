import mongoose from "mongoose";
import "dotenv/config.js";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not set");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB connected successfully`);
  } catch (error) {
    console.error(`❌ Error connecting to Database:`, error.message);
    process.exit(1);
  }
};

export default connectDB;
