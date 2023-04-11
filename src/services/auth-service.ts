import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "@prisma/client";
import userRepository from "@/repositories/users-repository";

async function signIn(params: SignInParams): Promise<SignInResult> {
	const { username, password, remember } = params;

	const user = await validadeUserExists(username);

	await validadePassword(password, user.password);

	const token = jwt.sign({ userId: user.id }, process.env.SECRET_JWT, {
		expiresIn: remember ? 86400 : 3600,
	});

	return {
		user: {
			id: user.id,
			name: user.name,
			username: user.username,
			email: user.email,
		},
		token,
	};
}

async function validadeUserExists(username: string) {
	const user = await userRepository.findByUsername(username);
	if (!user) {
		throw new Error("User not found");
	}
	return user;
}

async function validadePassword(password: string, givenpassword: string) {
	const isValid = await bcrypt.compare(password, givenpassword);
	if (!isValid) {
		throw new Error("Invalid password");
	}
}

export type SignInParams = Pick<Users, "username" | "password"> & { remember?: boolean };

type SignInResult = {
	user: Pick<Users, "id" | "name" | "username" | "email">;
	token: string;
};

const authService = {
	signIn,
};

export default authService;
