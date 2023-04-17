import { signInPost } from "../controllers";
import { Router } from "express";
import { validateBody } from "../middlewares/validation-middleware";
import { signInSchema } from "../schemas/auth-schema";

const authenticationRouter = Router();

authenticationRouter.post("/sign-in", validateBody(signInSchema), signInPost);

export { authenticationRouter };
