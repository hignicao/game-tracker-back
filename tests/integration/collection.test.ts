import { faker } from "@faker-js/faker";
import { prisma, redisClient } from "config/database";
import httpStatus from "http-status";
import supertest from "supertest";
import app, { close, init } from "../../src/app";
import { createUser } from "../factories";
import { createCollection } from "../factories/collection-factory";
import { createGame } from "../factories/game-factory";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
	await init();
	await cleanDb();
	await redisClient.flushDb();
});

beforeEach(async () => {
	await cleanDb();
});

afterAll(async () => {
	await close();
});

const server = supertest(app);

describe("GET /collection", () => {
	describe("when credentials are invalid", () => {
		it("should return with status 401 when user is not logged", async () => {
			const response = await server.get("/collection");
			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
		});

		it("should return with status 401 when user doenst send token", async () => {
			const response = await server.get("/collection").set("Authorization", `Bearer`);
			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
			expect(response.text).toBe("No token provided");
		});

		it("should return with status 401 if given token is invalid", async () => {
			const token = faker.lorem.word();
			const response = await server.get("/collection").set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
			expect(response.text).toBe("Invalid token");
		});
	});

	describe("when credentials are valid", () => {
		const generateValidBody = () => ({
			username: faker.internet.userName(),
			password: faker.internet.password(8),
		});
		it("should return with status 200 and empty array when user has no games in collection", async () => {
			const user = await createUser();
			const token = await generateValidToken(user);
			const response = await server.get("/collection").set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(httpStatus.OK);
			expect(response.body).toEqual([]);
		});

		it("should return with status 200 and array of simplified games when user has games in collection", async () => {
			const user = await createUser();
			const token = await generateValidToken(user);
			const game1 = await createGame();
			const game2 = await createGame();
			await createCollection({ userId: user.id, gameId: game1.id, statusId: 2 });
			await createCollection({ userId: user.id, gameId: game2.id, statusId: 3 });
			const response = await server.get("/collection").set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(httpStatus.OK);
			expect(response.body).toEqual([
				{ id: game1.id, statusId: 2 },
				{ id: game2.id, statusId: 3 },
			]);
		});
	});
});

describe("PUT /collection/update-collection", () => {
	describe("when credentials are invalid", () => {
		it("should return with status 401 when user is not logged", async () => {
			const response = await server.get("/collection");
			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
		});

		it("should return with status 401 when user doenst send token", async () => {
			const response = await server.get("/collection").set("Authorization", `Bearer`);
			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
			expect(response.text).toBe("No token provided");
		});

		it("should return with status 401 if given token is invalid", async () => {
			const token = faker.lorem.word();
			const response = await server.get("/collection").set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
			expect(response.text).toBe("Invalid token");
		});
	});

	describe("when credentials are valid but body is invalid", () => {
		const generateValidBody = () => ({});
		it("should return with status 400 when user send a gameId that doesnt exists", async () => {
			const user = await createUser();
			const token = await generateValidToken(user);
			const response = await server.put("/collection/update-collection").send({ gameId: 0, statusId: 2 }).set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(httpStatus.NOT_FOUND);
		});
	});

	describe("when credentials are valid and body is valid", () => {
		it("should return with status 201, insert new game if game isnt on local db and create a new collection", async () => {
			const user = await createUser();
			const token = await generateValidToken(user);
			const response = await server.put("/collection/update-collection").send({ gameId: 1020, statusId: 2 }).set("Authorization", `Bearer ${token}`);

			const game = await prisma.games.findUnique({ where: { id: 1020 } });
			const collection = await prisma.userCollection.findFirst({ where: { userId: user.id, gameId: 1020 } });
			expect(response.status).toBe(httpStatus.CREATED);
			expect(collection).not.toBeNull();
			expect(game).not.toBeNull();
		});

		it("should return with status 201, and update collection if game is already in collection", async () => {
			const user = await createUser();
			const token = await generateValidToken(user);
			const game = await createGame();
			await createCollection({ userId: user.id, gameId: game.id, statusId: 2 });
			const response = await server.put("/collection/update-collection").send({ gameId: game.id, statusId: 3 }).set("Authorization", `Bearer ${token}`);
			const collection = await prisma.userCollection.findFirst({ where: { userId: user.id, gameId: game.id } });
			expect(response.status).toBe(httpStatus.CREATED);
			expect(collection.statusId).toBe(3);
		});
	});
});

describe("DELETE /collection/:gameId", () => {
	describe("when credentials are invalid", () => {
		it("should return with status 401 when user is not logged", async () => {
			const response = await server.get("/collection");
			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
		});

		it("should return with status 401 when user doenst send token", async () => {
			const response = await server.get("/collection").set("Authorization", `Bearer`);
			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
			expect(response.text).toBe("No token provided");
		});

		it("should return with status 401 if given token is invalid", async () => {
			const token = faker.lorem.word();
			const response = await server.get("/collection").set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
			expect(response.text).toBe("Invalid token");
		});
	});

	describe("when credentials are valid but body is invalid", () => {
		it("should return with status 400 when user doesnt send gameId", async () => {
			const user = await createUser();
			const token = await generateValidToken(user);
			const response = await server.delete("/collection").set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(httpStatus.NOT_FOUND);
		});

		it("should return with status 404 when user doesnt have game in collection", async () => {
			const user = await createUser();
			const token = await generateValidToken(user);
			const game = await createGame();
			const response = await server.delete(`/collection/${game.id}`).set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(httpStatus.NOT_FOUND);
			expect(response.text).toBe("Game wasn't in collection");
		});

		it("should return with status 404 when game doesnt exist", async () => {
			const user = await createUser();
			const token = await generateValidToken(user);
			const response = await server.delete(`/collection/0`).set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(httpStatus.NOT_FOUND);
			expect(response.text).toBe("Game not found");
		});
	});

	describe("when credentials are valid and body is valid", () => {
		it("should return with status 200 and delete game from collection", async () => {
			const user = await createUser();
			const token = await generateValidToken(user);
			const game = await createGame();
			await createCollection({ userId: user.id, gameId: game.id, statusId: 2 });
			const response = await server.delete(`/collection/${game.id}`).set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(httpStatus.OK);
			expect(response.text).toBe("Game deleted from collection");
		});

		it("should delete game from user collection in db", async () => {
			const user = await createUser();
			const token = await generateValidToken(user);
			const game = await createGame();
			const newCollection = await createCollection({ userId: user.id, gameId: game.id, statusId: 2 });
			await server.delete(`/collection/${game.id}`).set("Authorization", `Bearer ${token}`);

			const collection = await prisma.userCollection.findUnique({
				where: {
					id: newCollection.id,
				},
			});
			expect(collection).toEqual(null);
		});
	});
});
