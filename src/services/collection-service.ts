import collectionRepository from "@/repositories/collection-repository";
import gameService from "./game-service";

async function updateGameCollection(userId: number, gameId: number, statusId: number) {
	await gameService.insertNewGameToDB(gameId);

	const collectionExists = await collectionRepository.checkIfGameIsInCollection(userId, gameId);
	if (collectionExists.length === 0) {
		return await collectionRepository.upsertNewCollection(userId, gameId, statusId, 0);
	}

	return await collectionRepository.upsertNewCollection(userId, gameId, statusId, collectionExists[0].id);
}

async function deleteGameFromCollection(userId: number, gameId: number) {
	const gameExists = await gameService.getGameById(gameId);
	if (!gameExists) {
		throw new Error("Game not found");
	}

	const collectionExists = await collectionRepository.checkIfGameIsInCollection(userId, gameId);
	if (collectionExists.length === 0) {
		throw new Error("Game wasn't in collection");
	}

	await collectionRepository.removeFromCollection(userId, gameId);
}

const collectionService = {
	updateGameCollection,
	deleteGameFromCollection,
};

export default collectionService;
