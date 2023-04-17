import { AuthenticatedRequest } from "../middlewares/auth-middleware";
import collectionService from "../services/collection-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getSimplifiedCollection(req: AuthenticatedRequest, res: Response) {
	const userId = req.userId;

	try {
		const collection = await collectionService.getSimplifiedCollection(userId);
		res.status(httpStatus.OK).send(collection);
	} catch (error) {
		res.status(httpStatus.BAD_REQUEST).send(error);
	}
}

export async function updateGameCollection(req: AuthenticatedRequest, res: Response) {
	const { gameId, statusId } = req.body as { gameId: number; statusId: number };
	const userId = req.userId;

	try {
		const game = await collectionService.updateGameCollection(userId, gameId, statusId);
		res.status(httpStatus.CREATED).send(game);
	} catch (error) {
		if (error.message === "Game not found") {
			return res.status(httpStatus.NOT_FOUND).send(error.message);
		}
		res.status(httpStatus.BAD_REQUEST).send(error);
	}
}

export async function deleteGameFromCollection(req: AuthenticatedRequest, res: Response) {
	const gameId = req.params.gameId;
	const userId = req.userId;

	try {
		await collectionService.deleteGameFromCollection(userId, Number(gameId));
		res.status(httpStatus.OK).send("Game deleted from collection");
	} catch (error) {
		if (error.message === "Game wasn't in collection" || error.message === "Game not found") {
			return res.status(httpStatus.NOT_FOUND).send(error.message);
		}
		res.status(httpStatus.BAD_REQUEST).send(error);
	}
}
