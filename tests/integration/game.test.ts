import { faker } from "@faker-js/faker";
import { prisma, redisClient } from "config/database";
import httpStatus from "http-status";
import supertest from "supertest";
import app, { close, init } from "../../src/app";
import { createCollection } from "../factories/collection-factory";
import { createGame } from "../factories/game-factory";
import { cleanDb } from "../helpers";

beforeAll(async () => {
	await init();
	await cleanDb();
	await redisClient.flushDb();
});

beforeEach(async () => {
	await cleanDb();
	await redisClient.flushDb();
});

afterAll(async () => {
	await close();
});

const server = supertest(app);

describe("GET /games/trending", () => {
	it("should return with status 200 and an array of games without redis", async () => {
		const response = await server.get("/games/trending");

		expect(response.status).toBe(httpStatus.OK);
		expect(response.body).toEqual(
			expect.arrayContaining([
				{
					id: expect.any(Number),
					name: expect.any(String),
					cover: expect.any(String),
					rating: expect.any(Number),
					statusId: 0,
				},
			])
		);
	});

	it("should return with status 200 and an array of games with redis", async () => {
		await server.get("/games/trending");
		const response2 = await server.get("/games/trending");

		expect(response2.status).toBe(httpStatus.OK);
		expect(response2.body).toEqual(
			expect.arrayContaining([
				{
					id: expect.any(Number),
					name: expect.any(String),
					cover: expect.any(String),
					rating: expect.any(Number),
					statusId: 0,
				},
			])
		);
	});
});
describe("GET /games/info/:id", () => {
	describe("when game isnt on local db", () => {
		it("should return with status 400 when the params isnt a number", async () => {
			const response = await server.get("/games/info/abc");
			expect(response.status).toBe(httpStatus.BAD_REQUEST);
		});

		it("should return with status 404 when id is a number but isnt of a existent game", async () => {
			const response = await server.get("/games/info/0");

			expect(response.status).toBe(httpStatus.NOT_FOUND);
		});

		it("should return with status 200 when game exists just on igdb", async () => {
			const response = await server.get("/games/info/1020");

			expect(response.status).toBe(httpStatus.OK);
			expect(response.body).toEqual({
				id: 1020,
				name: expect.any(String),
				cover: expect.any(String),
				rating: expect.any(Number),
				releaseDate: expect.any(String),
				summary: expect.any(String),
				genres: expect.any(Array),
				platforms: expect.any(Array),
				screenshots: expect.any(Array),
				statusId: 0,
			});
		});

		describe("when game is on local db", () => {
			it("should return with status 200 when game exists on local db", async () => {
				const game = await createGame();
				const response = await server.get(`/games/info/${game.id}`);

				expect(response.status).toBe(httpStatus.OK);
				expect(response.body).toEqual({
					id: game.id,
					name: game.name,
					cover: game.cover,
					rating: game.rating,
					releaseDate: game.releaseDate.toISOString(),
					summary: game.summary,
					genres: expect.any(Array),
					platforms: expect.any(Array),
					screenshots: expect.any(Array),
					statusId: 0,
				});
			});
		});
	});
});
describe("GET /games/search/", () => {
	it("should return with status 400 when no query is provided", async () => {
		const response = await server.get("/games/search");

		expect(response.status).toBe(httpStatus.BAD_REQUEST);
	});

	it("should return with status 200 and an array of games without redis", async () => {
		const response = await server.get("/games/search?game=witcher");

		expect(response.status).toBe(httpStatus.OK);
		expect(response.body).toEqual(
			expect.arrayContaining([
				{
					id: expect.any(Number),
					name: expect.any(String),
					releaseDate: expect.any(String) || null,
					cover: expect.any(String),
					summary: expect.any(String) || null,
					genres: expect.any(Array),
					statusId: 0,
				},
			])
		);
	});

	it("should return with status 200 and an array of games with redis when searching games", async () => {
		await server.get("/games/search?game=witcher");
		const response2 = await server.get("/games/search?game=witcher");

		expect(response2.status).toBe(httpStatus.OK);
		expect(response2.body).toEqual(
			expect.arrayContaining([
				{
					id: expect.any(Number),
					name: expect.any(String),
					releaseDate: expect.any(String) || null,
					cover: expect.any(String),
					summary: expect.any(String) || null,
					genres: expect.any(Array),
					statusId: 0,
				},
			])
		);
	});

	it("should return with status 200 and an empty array when searching games that doesnt exist", async () => {
		const response = await server.get("/games/search?game=jikhuiohj");

		expect(response.status).toBe(httpStatus.OK);
		expect(response.body).toEqual([]);
	});
});
