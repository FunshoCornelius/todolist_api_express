import express from "express";

import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/tasks.routes.js";
import authRouter from "./routes/auth.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(errorMiddleware);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", function (req, res) {
  res.send({
    data: {
      id: 1,
      name: "John Jamiu ",
      email: "6o2Vb@example.com",
    },
    status: "success",
  });
});

app.listen(PORT, async function () {
  console.log(`Todo app server is running on https://localhost:${PORT}`);
  await connectToDatabase();
  console.log("Press Ctrl+C to quit.");
});
