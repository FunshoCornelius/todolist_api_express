import { Router } from "express";
import {
  createTask,
  getUserTasks,
  deleteUserTask,
  deleteAllTaskForUser,
} from "../controllers/tasks.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const taskRouter = Router();

taskRouter.get("/", authorize, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the task route",
  });
});

taskRouter.get("/user/:id", authorize, getUserTasks);
taskRouter.post("/", authorize, createTask);
taskRouter.delete("/:userId/:id", authorize, deleteUserTask);
taskRouter.delete("/:userId", authorize, deleteAllTaskForUser);

export default taskRouter;
