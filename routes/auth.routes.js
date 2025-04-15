import { Router } from "express";

const authRouter = Router();
import { signUp, signIn } from "../controllers/auth.controller.js";

authRouter.post("/signup", signUp);
authRouter.post("/login", signIn);
// authRouter.post("/logout", signOut);

export default authRouter;
