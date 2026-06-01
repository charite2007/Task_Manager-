import mongoose from "mongoose";
import "dotenv/config.js";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Mongodb connected `);
  } catch (error) {
    console.log(`Error connecting Database ${error}`);
    process.exit(1)
    
  }
};

export default connectDB;