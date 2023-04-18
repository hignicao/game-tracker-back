import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";

export let prisma: PrismaClient;
export const redisClient = createClient({
	url: process.env.REDIS_URL,
});

export async function connectDb(): Promise<void> {
	prisma = new PrismaClient();
	await redisClient.connect();
}

export async function disconnectDB(): Promise<void> {
	await prisma?.$disconnect();
	await redisClient.quit();
}
