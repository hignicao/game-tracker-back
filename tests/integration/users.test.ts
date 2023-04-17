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
});

afterAll(async () => {
	await close();
});

const server = supertest(app);

describe("POST /users", () => {
	describe("when body is invalid", () => {
		it("should return with status 400 when body is not given", async () => {
			const response = await server.post("/users");
			expect(response.status).toBe(httpStatus.BAD_REQUEST);
		});

		it("should respond with status 400 when body is not valid", async () => {
			const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

			const response = await server.post("/users").send(invalidBody);

			expect(response.status).toBe(httpStatus.BAD_REQUEST);
		});
	});
	describe("when body is valid", () => {
		const generateValidBody = () => ({
			name: faker.name.fullName(),
			username: faker.internet.userName(),
			email: faker.internet.email(),
			password: faker.internet.password(8),
		});

		it("should respond with status 409 when username already exists", async () => {
			const validBody1 = generateValidBody();
			await server.post("/users").send(validBody1);

			const validBody2 = generateValidBody();
			validBody2.username = validBody1.username;

			const response = await server.post("/users").send(validBody2);

			expect(response.status).toBe(httpStatus.CONFLICT);
			expect(response.text).toBe("Username already in use");
		});

		it("should respond with status 409 when email already exists", async () => {
			const validBody1 = generateValidBody();
			await server.post("/users").send(validBody1);

			const validBody2 = generateValidBody();
			validBody2.email = validBody1.email;

			const response = await server.post("/users").send(validBody2);

			expect(response.status).toBe(httpStatus.CONFLICT);
			expect(response.text).toBe("Email already in use");
		});

		it("should respond with status 201 and user info when body is valid", async () => {
			const validBody = generateValidBody();

			const response = await server.post("/users").send(validBody);

			expect(response.status).toBe(httpStatus.CREATED);
			expect(response.body).toEqual({
				id: expect.any(Number),
				username: validBody.username,
			});
		});

		it("should not return user password on body", async () => {
			const validBody = generateValidBody();

			const response = await server.post("/users").send(validBody);

			expect(response.body).not.toHaveProperty("password");
		});

		it("should save user to database", async () => {
			const validBody = generateValidBody();

			const response = await server.post("/users").send(validBody);

			const user = await prisma.users.findUnique({
				where: {
					id: response.body.id,
				},
			});

			expect(user).toEqual(
				expect.objectContaining({
					id: response.body.id,
					username: validBody.username,
				})
			);
		});
	});
});

describe("GET /users/profile/:username", () => {
	describe("when username is invalid", () => {
		it("should respond with status 404 when username is not found", async () => {
			const response = await server.get("/users/profile/notfound");

			expect(response.status).toBe(httpStatus.NOT_FOUND);
			expect(response.text).toBe("User not found");
		});
	});

	describe("when username is valid", () => {
		it("should respond with status 200, user info and empty collection", async () => {
			const validBody = {
				name: faker.name.fullName(),
				username: faker.internet.userName(),
				email: faker.internet.email(),
				password: faker.internet.password(8),
			};

			const response = await server.post("/users").send(validBody);

			const user = await server.get(`/users/profile/${validBody.username}`);

			expect(user.status).toBe(httpStatus.OK);
			expect(user.body).toEqual({
				id: response.body.id,
				name: validBody.name,
				username: validBody.username,
				collection: [],
			});
		});

		it("should respond with status 200, user info and collection", async () => {
			const validBody = {
				name: faker.name.fullName(),
				username: faker.internet.userName(),
				email: faker.internet.email(),
				password: faker.internet.password(8),
			};

			const response = await server.post("/users").send(validBody);

			const game = await createGame();
			const collection = await createCollection({ userId: response.body.id, gameId: game.id });

			const user = await server.get(`/users/profile/${validBody.username}`);

			expect(user.status).toBe(httpStatus.OK);
			expect(user.body).toEqual({
				id: response.body.id,
				name: validBody.name,
				username: validBody.username,
				collection: [
					{
						id: game.id,
						name: game.name,
						cover: game.cover,
						rating: game.rating,
						statusId: collection.statusId,
					},
				],
			});
		});
	});
});
