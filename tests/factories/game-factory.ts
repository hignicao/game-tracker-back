import { Games } from "@prisma/client";
import { prisma } from "../../src/config/database";
import { faker } from "@faker-js/faker";

export async function createGame(params: Partial<Games> = {}): Promise<Games> {
	const game = await prisma.games.create({
		data: {
			name: params.name || faker.commerce.productName(),
			cover: params.cover || faker.random.alphaNumeric(10),
			rating: params.rating || Number(faker.random.numeric(2)),
			releaseDate: params.releaseDate || faker.date.past(10),
			summary: params.summary || faker.lorem.paragraph(),
		},
	});

	const genresRaw = await prisma.gameGenre.create({
		data: {
			gameId: game.id,
			genreId: 4,
		},
	});

	const genres = await prisma.genres.findUnique({
		where: {
			id: genresRaw.genreId,
		},
	});

	const platformsRaw = await prisma.gamePlatform.create({
		data: {
			gameId: game.id,
			platformId: 6,
		},
	});

	const platforms = await prisma.platforms.findUnique({
		where: {
			id: platformsRaw.platformId,
		},
	});

	const screenshotsRaw = await prisma.screenshots.create({
		data: {
			gameId: game.id,
			screenshot: faker.random.alphaNumeric(10),
		},
	});

	const screenshots = await prisma.screenshots.findUnique({
		where: {
			id: screenshotsRaw.id,
		},
	});

	const data = {
		...game,
		genres: [genres],
		platforms: [platforms],
		screenshots: [screenshots],
	};

	return data;
}
