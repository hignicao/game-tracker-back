import bcrypt from "bcrypt";
import userRepository from "@/repositories/users-repository";
import { Users } from "@prisma/client";
import collectionRepository from "@/repositories/collection-repository";

async function createUser({ name, username, email, password }: CreateUserParams): Promise<Users> {
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

async function getUserProfileInfo(givenUsername: string) {
	const user = await userRepository.findByUsername(givenUsername);
	if (!user) {
		throw new Error("User not found");
	}
	const userCollection = await collectionRepository.getUserCollection(user.id);

	const allUserInfo = {
		id: user.id,
		name: user.name,
		username: user.username,
		collection: userCollection,
	};

	return allUserInfo;
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

async function validadeIdWithUsername(givenUsername: string, userId: number) {
	const user = await userRepository.findByUsername(givenUsername);
	if (user?.id !== userId) {
		throw new Error("You can only edit your own profile");
	}
}

export type CreateUserParams = Pick<Users, "name" | "username" | "email" | "password">;

const userService = {
	createUser,
	validadeUniqueEmail,
	validadeUniqueUsername,
	validadeIdWithUsername,
	getUserProfileInfo,
};

export default userService;
