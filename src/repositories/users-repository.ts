import { prisma } from "config";
import { CreateUserParams } from "services";

async function create(data: CreateUserParams) {
	return prisma.user.create({ data });
}

async function findByEmail(email: string) {
	return prisma.user.findUnique({
		where: {
			email,
		},
	});
}

async function findByUsername(username: string) {
	return prisma.user.findUnique({
		where: {
			username,
		},
	});
}

const userRepository = {
	create,
	findByEmail,
	findByUsername,
};

export default userRepository;
