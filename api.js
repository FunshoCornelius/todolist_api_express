import serverless from "serverless-http";
import connectToDatabase from "./database/mongodb.js";
import app from "./app.js";

// Connect to DB inside a wrapper
let isDbConnected = false;

const handler = async (req, res) => {
  try {
    if (!isDbConnected) {
      await connectToDatabase();
      isDbConnected = true;
    }
    const serverlessHandler = serverless(app);
    return serverlessHandler(req, res);
  } catch (error) {
    console.error("Error connecting to database:", error);
    res.status(500).json({ error: "Couldn't start the server" });
  }
};

export default handler;
