import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error("DATABASE_URL is not defined");
}

export default async function connectToDatabase() {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
}
