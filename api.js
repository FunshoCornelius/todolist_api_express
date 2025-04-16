import serverless from "serverless-http";
import connectToDatabase from "./database/mongodb.js";
import app from "./app.js";

// Connect to DB inside a wrapper
let isDbConnected = false;

const handler = async (req, res) => {
  if (!isDbConnected) {
    await connectToDatabase();
    isDbConnected = true;
  }
  const serverlessHandler = serverless(app);
  return serverlessHandler(req, res);
};

export default handler;
