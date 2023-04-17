import { prisma } from "../config/database";

async function getUserCollection(userId: number) {
	const collectionRaw = await prisma.userCollection.findMany({
		where: {
			userId: userId,
		},
		orderBy: {
			id: 'desc',
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

	return collectionRaw.map((game) => {
		return {
			id: game.Games.id,
			name: game.Games.name,
			cover: game.Games.cover,
			rating: game.Games.rating,
			statusId: game.statusId,
		};
	});
}

async function getUserCollectionSimplified(userId: number) {
	const collectionRaw = await prisma.userCollection.findMany({
		where: {
			userId: userId,
		},
		select: {
			Games: {
				select: {
					id: true,
				},
			},
			statusId: true,
		},
	});

	return collectionRaw.map((game) => {
		return {
			id: game.Games.id,
			statusId: game.statusId,
		};
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
	return await prisma.userCollection.upsert({
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
	getUserCollectionSimplified,
	checkIfGameIsInCollection,
	upsertNewCollection,
	removeFromCollection,
};

export default collectionRepository;
