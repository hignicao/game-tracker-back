import bcrypt from "bcrypt";
import userRepository from "repositories/users-repository";
import { User } from "@prisma/client";

async function createUser({ name, username, email, password }: CreateUserParams): Promise<User> {
	await validadeUniqueEmail(email);
	await validadeUniqueUsername(username);

	const hashedPassword = await bcrypt.hash(password, 12);

	return userRepository.create({
		name,
		username,
		email,
		password: hashedPassword,
	});
}

async function validadeUniqueEmail(email: string) {
	const userWithSameEmail = await userRepository.findByEmail(email);
	if (userWithSameEmail) {
		throw new Error("Email already in use");
	}
}

async function validadeUniqueUsername(username: string) {
	const userWithSameUsername = await userRepository.findByUsername(username);
	if (userWithSameUsername) {
		throw new Error("Username already in use");
	}
}

export type CreateUserParams = Pick<User, "name" | "username" | "email" | "password">;

const userService = {
	createUser,
	validadeUniqueEmail,
	validadeUniqueUsername,
};

export default userService;
