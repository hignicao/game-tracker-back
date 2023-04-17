import "express-async-errors";
import express, { json, Request, Response, Express } from "express";
import { connectDb, disconnectDB } from "./config/database";
import { authenticationRouter, collectionRouter, gamesRouter, usersRouter } from "./routers";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app
	.use(cors())
	.use(json())
	.get("/health", (req: Request, res: Response) => res.send("I'am alive!"))
	.use("/auth", authenticationRouter)
	.use("/users", usersRouter)
	.use("/collection", collectionRouter)
	.use("/games", gamesRouter)


export function init(): Promise<Express> {
	connectDb();
	return Promise.resolve(app);
}

export async function close(): Promise<void> {
	await disconnectDB();
}

export default app;
