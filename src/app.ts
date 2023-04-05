import "express-async-errors";
import express, { json, Request, Response, Express } from "express";
import cors from "cors";
import { connectDb, disconnectDB } from "./config";
import { authenticationRouter, usersRouter } from "routers";

const app = express();
app
	.use(json())
	.use(cors())
	.get("/health", (req: Request, res: Response) => res.send("I'am alive!"))
	.use("/auth", authenticationRouter)
	.use("/users", usersRouter);

export function init(): Promise<Express> {
	connectDb();
	return Promise.resolve(app);
}

export async function close(): Promise<void> {
	await disconnectDB();
}
export default app;
