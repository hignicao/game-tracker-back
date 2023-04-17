import { faker } from "@faker-js/faker";
import { prisma } from "config/database";
import httpStatus from "http-status";
import supertest from "supertest";
import app, { close, init } from "../../src/app";
import { cleanDb } from "../helpers";

beforeAll(async () => {
	await init();
	await cleanDb();
});

beforeEach(async () => {
	await cleanDb();
});

afterAll(async () => {
	await close();
});

const server = supertest(app);

describe("POST /users", () => {
	describe("when body is valid", () => {
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
