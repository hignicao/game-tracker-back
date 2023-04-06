import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import userRepository from "@/repositories/users-repository";

async function signIn(params: SignInParams): Promise<SignInResult> {
	const { username, password } = params;

	const user = await validadeUserExists(username);

	await validadePassword(password, user.password);

	const token = jwt.sign({ userId: user.id }, process.env.SECRET_JWT, {
		expiresIn: 86400,
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

export type SignInParams = Pick<User, "username" | "password">;

type SignInResult = {
	user: Pick<User, "id" | "name" | "username" | "email">;
	token: string;
};

const authService = {
	signIn,
};

export default authService;
