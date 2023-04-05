import { Request, Response } from "express";
import httpStatus from "http-status";
import authService, { SignInParams } from "services/auth-service";

export async function signInPost(req: Request, res: Response) {
	const user = req.body as SignInParams;

	try {
		const loggedUser = await authService.signIn(user);
		return res.status(httpStatus.OK).send(loggedUser);
	} catch (error) {
		if (error.message === "User not found") {
			return res.status(httpStatus.NOT_FOUND).send(error.message);
		}
		if (error.message === "Invalid password") {
			return res.status(httpStatus.UNAUTHORIZED).send(error.message);
		}
		return res.status(httpStatus.UNAUTHORIZED);
	}
}
