import * as jwt from "jsonwebtoken";
import { Users } from "@prisma/client";

import { createUser } from "./factories";
import { prisma } from "../src/config/database";

export async function cleanDb() {
	await prisma.userCollection.deleteMany({});
	await prisma.users.deleteMany({});
	await prisma.gamePlatform.deleteMany({});
	await prisma.gameGenre.deleteMany({});
	await prisma.screenshots.deleteMany({});
	await prisma.games.deleteMany({});
	await prisma.$disconnect();
}

export async function generateValidToken(user?: Users) {
	const incomingUser = user || (await createUser());
	const token = jwt.sign({ userId: incomingUser.id }, process.env.SECRET_JWT);

	return token;
}
