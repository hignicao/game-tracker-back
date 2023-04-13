import { Game } from "@/protocols";
import { prisma } from "config";

async function create(data: Game) {
	await prisma.games.create({
		data: {
			id: data.id,
			name: data.name,
			cover: data.cover,
			rating: data.rating,
			releaseDate: data.releaseDate,
			summary: data.summary,
		},
	});

	await prisma.gameGenre.createMany({
		data: data.genres.map((genre) => {
			return {
				gameId: data.id,
				genreId: genre.id,
			};
		}),
	});

	await prisma.gamePlatform.createMany({
		data: data.platforms.map((platform) => {
			return {
				gameId: data.id,
				platformId: platform.id,
			};
		}),
	});

	await prisma.screenshots.createMany({
		data: data.screenshots.map((screenshot) => {
			return {
				gameId: data.id,
				screenshot,
			};
		}),
	});
}

async function findById(id: number) {
	const gameRaw = await prisma.games.findUnique({
		where: {
			id,
		},
		select: {
			id: true,
			name: true,
			cover: true,
			rating: true,
			releaseDate: true,
			summary: true,
			GameGenre: {
				select: {
					Genres: true,
				},
			},
			GamePlatform: {
				select: {
					Platforms: true,
				},
			},
			Screenshots: true,
		},
	});

	if (!gameRaw) {
		return null;
	}

	const gameInfo = {
		id: gameRaw.id,
		name: gameRaw.name,
		cover: gameRaw.cover,
		rating: gameRaw.rating,
		releaseDate: gameRaw.releaseDate,
		summary: gameRaw.summary,
		genres: gameRaw.GameGenre.map((genre) => genre.Genres),
		platforms: gameRaw.GamePlatform.map((platform) => platform.Platforms),
		screenshots: gameRaw.Screenshots.map((screenshot) => screenshot.screenshot),
	};

	return gameInfo;
}

const gameRepository = {
	create,
	findById,
};

export default gameRepository;
