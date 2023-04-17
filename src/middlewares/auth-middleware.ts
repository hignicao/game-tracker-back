import userRepository from "../repositories/users-repository";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

export async function autheticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
	const authHeader = req.header("Authorization");
	if (!authHeader) return res.status(httpStatus.UNAUTHORIZED).send("Missing authorization header");

	const token = authHeader.split(" ")[1];
	if (!token) return res.status(httpStatus.UNAUTHORIZED).send("No token provided");

	try {
		const { userId } = jwt.verify(token, process.env.SECRET_JWT) as JWTPayload;

		const user = await userRepository.findById(userId);
		if (!user) return res.status(httpStatus.UNAUTHORIZED).send("Invalid token");

		req.userId = userId;
		return next();
	} catch (error) {
		return res.status(httpStatus.UNAUTHORIZED).send("Invalid token");
	}
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
	userId: number;
};
