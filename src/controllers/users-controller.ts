import { Request, Response } from "express";
import httpStatus from "http-status";
import userService, { CreateUserParams } from "@/services/users-service";

export async function signUpPost(req: Request, res: Response) {
	const user = req.body as CreateUserParams;

	try {
		const createdUser = await userService.createUser(user);
		return res.status(httpStatus.CREATED).json({
			id: createdUser.id,
			username: createdUser.username,
		});
	} catch (error) {
		if (error.message === "Email already in use" || error.message === "Username already in use") {
			return res.status(httpStatus.CONFLICT).send(error.message);
		}
		return res.status(httpStatus.BAD_REQUEST).send(error);
	}
}

export async function getUserProfile(req: Request, res: Response) {
	const givenUsername = req.params.username;

	try {
		const userInfo = await userService.getUserProfileInfo(givenUsername);
		return res.status(httpStatus.OK).send(userInfo);
	} catch (error) {
		return res.status(httpStatus.BAD_REQUEST).send(error);
	}
}