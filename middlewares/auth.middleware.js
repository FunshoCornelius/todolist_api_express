import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/env.js";
import User from "../model/user.model.js";

async function authorize(req, res, next) {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized No token" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if user exists.
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized No User" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
}

export { authorize };
