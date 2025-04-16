import serverless from "serverless-http";
import connectToDatabase from "./database/mongodb.js";
import app from "./app.js";

await connectToDatabase(); // Ensure DB is connected before handling requests

export const handler = serverless(app);
