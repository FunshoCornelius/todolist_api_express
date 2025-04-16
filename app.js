import express from "express";
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/tasks.routes.js";
import authRouter from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDatabase from "./database/mongodb.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Task Manager API",
  });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/auth", authRouter);

app.listen(process.env.PORT || 5000, async () => {
  try {
    await connectToDatabase();
    console.log("✅ Connected to MongoDB");
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
});

export default app;
