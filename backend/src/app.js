import express from "express";
import connectDB from "./config/db.js";
import routes from "./routes/task.routes.js";
import cors from "cors"
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/task",routes)
await connectDB();

export default app;
