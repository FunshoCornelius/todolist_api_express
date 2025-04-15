import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minLength: 3,
      maxLength: 1000,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);
const Task = mongoose.model("Task", taskSchema);
export default Task;
