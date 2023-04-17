import { faker } from "@faker-js/faker";
import { redisClient } from "config/database";
import httpStatus from "http-status";
import supertest from "supertest";
import app, { close, init } from "../../src/app";
import { createUser } from "../factories";
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

describe("POST /auth/sign-in", () => {
	describe("when body is invalid", () => {
		it("should return with status 400 when body is not given", async () => {
			const response = await server.post("/auth/sign-in");
			expect(response.status).toBe(httpStatus.BAD_REQUEST);
		});

		it("should respond with status 400 when body is not valid", async () => {
			const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

			const response = await server.post("/auth/sign-in").send(invalidBody);

			expect(response.status).toBe(httpStatus.BAD_REQUEST);
		});
	});

	describe("when body is valid", () => {
		const generateValidBody = () => ({
			username: faker.internet.userName(),
			password: faker.internet.password(8),
		});

		it("should respond with status 401 if there is no user for given email", async () => {
			const body = generateValidBody();

			const response = await server.post("/auth/sign-in").send(body);

			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
			expect(response.text).toBe("User not found");
		});

		it("should respond with status 401 if password is invalid", async () => {
			const body = generateValidBody();
			await createUser(body);

			const response = await server.post("/auth/sign-in").send({
				...body,
				password: faker.internet.password(8),
			});

			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
			expect(response.text).toBe("Invalid password");
		});

		describe("when credentials are valid", () => {
			it("should respond with status 200 and user data", async () => {
				const body = generateValidBody();
				const user = await createUser(body);

				const response = await server.post("/auth/sign-in").send(body);

				expect(response.status).toBe(httpStatus.OK);
				expect(response.body.user).toEqual({
					id: user.id,
					name: user.name,
					username: user.username,
					email: user.email,
				});
			});

			it("should respond with status 200 and token", async () => {
				const body = generateValidBody();
				await createUser(body);

				const response = await server.post("/auth/sign-in").send(body);

				expect(response.status).toBe(httpStatus.OK);
				expect(response.body.token).toBeDefined();
			});
		});
	});
});
