import { signUpPost } from "@/controllers";
import { Router } from "express";
import { validateBody } from "@/middlewares/validation-middleware";
import { createUserSchema } from "@/schemas/users-schema";

const usersRouter = Router();

usersRouter.post("/", validateBody(createUserSchema), signUpPost);

export { usersRouter };
