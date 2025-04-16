import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error("DATABASE_URI is not defined");
}

let isConnected = false;

export default async function connectToDatabase() {
  if (isConnected) return;

  try {
    await mongoose.connect(DB_URI);
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}
