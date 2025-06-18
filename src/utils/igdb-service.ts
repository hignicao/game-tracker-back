import { GameIGDB, SearchedGameIGDB, TrendingGameIGDB } from "../protocols";
import { request } from "./request";

const url = "https://api.igdb.com/v4/games";
const config = {
	headers: {
		Authorization: `Bearer ${process.env.IGDB_API_KEY}`,
		"Client-ID": process.env.IGDB_CLIENT_ID,
	},
};

async function getTrendingGamesIGDBAPI(): Promise<TrendingGameIGDB[]> {
	const body =
		"fields name, cover.image_id, aggregated_rating; where parent_game = null & aggregated_rating != null & total_rating_count > 100; sort total_rating_count desc; limit 100;";

	const result = await request.post(url, body, config);

	return result.data;
}

async function getGameByIGDBId(gameId: number): Promise<GameIGDB> {
	const body = `fields name, cover.image_id, genres.name, screenshots.image_id, summary, aggregated_rating, first_release_date, platforms.name; where id = ${gameId};`;

	const result = await request.post(url, body, config);

	return result.data[0];
}

async function searchGamesIGDBAPI(query: string): Promise<SearchedGameIGDB[]> {
	const body = `fields name, cover.image_id, first_release_date, genres.name, summary; where parent_game = null & version_parent = null & cover != null; search "${query}"; limit 50;`;

	const result = await request.post(url, body, config);

	return result.data;
}

export { getTrendingGamesIGDBAPI, getGameByIGDBId, searchGamesIGDBAPI };
