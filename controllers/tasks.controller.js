import Task from "../model/tasks.model.js";

/**
 * Retrieves all tasks for a specified user.
 * The user is identified by the user ID in the request parameters.
 * The requesting user must be authorized to view the tasks.
 *
 * @param {Object} req - The request object containing user and params.
 * @param {Object} res - The response object for sending the result.
 * @param {Function} next - The next middleware function.
 *
 * @throws {Error} Throws an error if user is not authorized or no tasks are found.
 *
 * @returns {Object} Returns a JSON object with a success flag and the user's tasks.
 */

async function getUserTasks(req, res, next) {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error(
        "You are not authorized to view this user's tasks"
      );
      error.statusCode = 401;
      throw error;
    }

    const tasks = await Task.find({ user: req.params.id });

    if (!tasks || tasks.length === 0) {
      const error = new Error("No tasks found for this user");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Creates a new task for the user identified by the req.user._id field.
 * The task details are provided in the req.body object.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 *
 * @throws {Error} Throws an error if the task creation fails.
 *
 * @returns {Object} Returns a JSON object with a success flag and the created task.
 */
async function createTask(req, res, next) {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Deletes a specific task for a user. The task is identified by its ID,
 * and the user is identified by the userId in the request parameters.
 * The user making the request must be authorized to delete the task.
 *
 * @param {Object} req - The request object containing user and params.
 * @param {Object} res - The response object for sending the result.
 * @param {Function} next - The next middleware function for error handling.
 *
 * @throws {Error} Throws an error if the user is unauthorized to delete the task
 * or if any other error occurs during the process.
 */

async function deleteUserTask(req, res, next) {
  try {
    if (req.user.id === req.params.userId) {
      await Task.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        data: null,
      });
    }
    if (!res.success) {
      const error = new Error("Unauthorized to delete this task");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

async function deleteAllTaskForUser(req, res, next) {
  try {
    if (req.user.id === req.params.userId) {
      await Task.deleteMany({ user: req.params.userId });

      res.status(200).json({
        success: true,
        data: null,
      });
    }
    if (!res.success) {
      const error = new Error("Unauthorized to delete this task");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

export { createTask, getUserTasks, deleteUserTask, deleteAllTaskForUser };
