import { prisma } from "config";

async function getUserCollection(userId: number) {
	return prisma.userCollection.findMany({
		where: {
			userId: userId,
		},
		select: {
			Games: {
				select: {
					id: true,
					name: true,
					cover: true,
					rating: true,
				},
			},
			statusId: true,
		},
	});
}

async function checkIfGameIsInCollection(userId: number, gameId: number) {
	return prisma.userCollection.findMany({
		where: {
			userId,
			gameId,
		},
	});
}

async function upsertNewCollection(userId: number, gameId: number, statusId: number, collectionId: number) {
	await prisma.userCollection.upsert({
		where: {
			id: collectionId,
		},
		create: {
			userId,
			gameId,
			statusId,
		},
		update: {
			statusId,
		},
	});
}

async function removeFromCollection(userId: number, gameId: number) {
	await prisma.userCollection.deleteMany({
		where: {
			userId,
			gameId,
		},
	});
}

const collectionRepository = {
	getUserCollection,
	checkIfGameIsInCollection,
	upsertNewCollection,
	removeFromCollection,
};

export default collectionRepository;
