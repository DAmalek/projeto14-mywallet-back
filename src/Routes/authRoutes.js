import { signIn, signUp } from "../Controller/authController.js";
import { Router } from "express";
import { validateSchema } from "../Middleware/validateSchema.js";
import { authSchema, LoginSchema } from "../Schemas/AuthSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(authSchema), signUp);

authRouter.post("/sign-in", validateSchema(LoginSchema), signIn);

export default authRouter;
