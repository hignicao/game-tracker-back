import { redisClient } from "../config/database";
import { Game, GameIGDB, SearchedGame, SearchedGameIGDB, TrendingGame, TrendingGameIGDB } from "../protocols";
import gameRepository from "../repositories/game-repository";
import { getGameByIGDBId, getTrendingGamesIGDBAPI, searchGamesIGDBAPI } from "../utils/igdb-service";
import { fromUnixTime } from "date-fns";

async function getGameById(gameId: number) {
	const game = await gameRepository.findById(gameId);
	if (!game) {
		return getGameFromIGDB(gameId);
	}
	return game;
}

async function insertNewGameToDB(gameId: number) {
	const game = await gameRepository.findById(gameId);
	if (!game) {
		const newGame = await getGameFromIGDB(gameId);
		await gameRepository.create(newGame);
		return newGame;
	}
	return game;
}

async function getTrendingGames(): Promise<TrendingGame[]> {
	const daysToExpire = 15;
	const redisEvent = await redisClient.get("trending-games");

	if (redisEvent) {
		return JSON.parse(redisEvent);
	} else {
		const result = await getTrendingGamesIGDBAPI();
		const trendingGames = result.map((game: TrendingGameIGDB) => {
			return {
				id: game.id,
				name: game.name,
				cover: game.cover?.image_id || null,
				rating: Math.round(game.aggregated_rating) || null,
				statusId: 0,
			};
		});

		redisClient.setEx("trending-games", daysToExpire * 86400, JSON.stringify(trendingGames));
		return trendingGames;
	}
}

async function getGameFromIGDB(gameId: number): Promise<Game> {
	const result = (await getGameByIGDBId(gameId)) as GameIGDB;
	if (!result) {
		throw new Error("Game not found");
	}

	const game = {
		id: result.id,
		name: result.name,
		cover: result.cover?.image_id || null,
		rating: Math.round(result.aggregated_rating) || null,
		releaseDate: fromUnixTime(result.first_release_date) || null,
		summary: result.summary || null,
		genres: result.genres || [],
		platforms: result.platforms || [],
		screenshots: result.screenshots?.map((screenshot) => screenshot.image_id) || [],
		statusId: 0,
	};
	return game;
}

async function searchGames(query: string): Promise<SearchedGame[]> {
	const daysToExpire = 15;
	const redisEvent = await redisClient.get(`search-${query}`);

	if (redisEvent) {
		return JSON.parse(redisEvent);
	} else {
		const searchResult = await searchGamesIGDBAPI(query);
		const searchedGames = searchResult.map((game: SearchedGameIGDB) => {
			return {
				id: game.id,
				name: game.name,
				releaseDate: fromUnixTime(game.first_release_date) || null,
				cover: game.cover?.image_id || null,
				summary: game.summary || null,
				genres: game.genres || [],
				statusId: 0,
			};
		});

		redisClient.setEx(`search-${query}`, daysToExpire * 86400, JSON.stringify(searchedGames));
		return searchedGames;
	}
}

const gameService = {
	getGameById,
	insertNewGameToDB,
	getTrendingGames,
	searchGames,
};

export default gameService;
