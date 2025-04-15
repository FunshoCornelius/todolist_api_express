export default function errorMiddleware(err, req, res, next) {
  try {
    let error = {};
    error.status = err.status || 500;
    error.message = err.message || "Internal Server Error";
    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;

      error = new Error(message);
      error.status = 404;
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate field value entered: ${err.keyValue.name}`;
      error = new Error(message);
      error.status = 400;
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors)
        .map((val) => val.message)
        .join(", ");
      error = new Error(message || "Validation error");
      error.status = 400;
    }

    res.status(error.status || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
