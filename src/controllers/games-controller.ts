import gameService from "@/services/game-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getTrendingGames(req: Request, res: Response) {
	try {
		const games = await gameService.getTrendingGames();
		res.status(httpStatus.OK).send(games);
	} catch (error) {
		return res.status(httpStatus.BAD_REQUEST).send(error);
	}
}

export async function getGameInfo(req: Request, res: Response) {
	const gameId = req.params.id;

	try {
		const game = await gameService.getGameInfo(Number(gameId));
		res.status(httpStatus.OK).send(game);
	} catch (error) {
		return res.status(httpStatus.BAD_REQUEST).send(error);
	}
}

export async function searchGames(req: Request, res: Response) {
	const query = req.query.game as string;

	if (!query) {
		return res.status(httpStatus.BAD_REQUEST).send("No query provided");
	}

	try {
		const searchedGames = await gameService.searchGames(query);
		return res.status(httpStatus.OK).send(searchedGames);
	} catch (error) {
		return res.status(httpStatus.BAD_REQUEST).send(error);
	}
}
