import collectionRepository from "../repositories/collection-repository";
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
	await gameService.getGameById(gameId);

	const collectionExists = await collectionRepository.checkIfGameIsInCollection(userId, gameId);
	if (collectionExists.length === 0) {
		throw new Error("Game wasn't in collection");
	}

	await collectionRepository.removeFromCollection(userId, gameId);
}

async function getSimplifiedCollection(userId: number) {
	return await collectionRepository.getUserCollectionSimplified(userId);
}

const collectionService = {
	updateGameCollection,
	deleteGameFromCollection,
	getSimplifiedCollection,
};

export default collectionService;
