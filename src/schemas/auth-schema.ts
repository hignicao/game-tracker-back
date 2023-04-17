import Joi from "joi";
import { SignInParams } from "../services";

export const signInSchema = Joi.object<SignInParams>({
	username: Joi.string().required(),
	password: Joi.string().required(),
	remember: Joi.boolean().optional(),
});
