export type Game = {
	id: number;
	name: string;
	cover: string;
	rating: number;
	releaseDate: Date;
	summary: string;
	genres: {
		id: number;
		name: string;
	}[];
	platforms: {
		id: number;
		name: string;
	}[];
	screenshots: string[];
	statusId: number;
};

export type TrendingGame = Pick<Game, "id" | "name" | "cover" | "rating" | "statusId">;

export type CollectionGame = Pick<Game, "id" | "name" | "cover" | "rating" | "statusId">;

export type SimplifiedCollectionGame = Pick<Game, "id" | "statusId">;

export type SearchedGame = Pick<Game, "id" | "name" | "cover" | "summary" | "genres" | "statusId" | "releaseDate">;

export type GameIGDB = {
	id: number;
	aggregated_rating: number;
	cover: {
		id: number;
		image_id: string;
	};
	first_release_date?: number;
	genres: {
		id: number;
		name: string;
	}[];
	name: string;
	platforms: {
		id: number;
		name: string;
	}[];
	screenshots: {
		id: number;
		image_id: string;
	}[];
	summary: string;
};

export type TrendingGameIGDB = Pick<GameIGDB, "id" | "name" | "cover" | "aggregated_rating">;

export type SearchedGameIGDB = Pick<GameIGDB, "id" | "name" | "cover" | "summary" | "genres" | "first_release_date">;
