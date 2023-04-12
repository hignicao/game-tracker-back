import { redisClient } from "@/config";
import { Game, GameIGDB, SearchedGame, SearchedGameIGDB, TrendingGame, TrendingGameIGDB } from "@/protocols";
import gameRepository from "@/repositories/game-repository";
import { getGameByIGDBId, getTrendingGamesIGDBAPI, searchGamesIGDBAPI } from "@/utils/igdb-service";
import { fromUnixTime } from "date-fns";

async function getGameById(gameId: number) {
	const game = await gameRepository.findById(gameId);
	if (!game) {
		throw new Error("Game not found");
	}

	return game;
}

async function insertNewGameToDB(game: Game) {
	const gameAlreadyExists = await gameRepository.findById(game.id);
	if (gameAlreadyExists) {
		throw new Error("Game already exists");
	}

	// return gameRepository.create(game);
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

async function getGameInfo(gameId: number): Promise<Game> {
	const result = (await getGameByIGDBId(gameId)) as GameIGDB;
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
	getGameInfo,
	searchGames,
};

export default gameService;
