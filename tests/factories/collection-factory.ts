import { UserCollection } from "@prisma/client";
import { prisma } from "config/database";

export async function createCollection(params: Partial<UserCollection> = {}): Promise<UserCollection> {
	return prisma.userCollection.create({
		data: {
			userId: params.userId || 1,
			gameId: params.gameId || 1,
			statusId: params.statusId || 1,
		},
	});
}
