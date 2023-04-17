import Joi from "joi";
import { CreateUserParams } from "../services";

export const createUserSchema = Joi.object<CreateUserParams>({
	name: Joi.string().required(),
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
});
