import { prisma } from "config";
import { CreateUserParams } from "@/services";

async function create(data: CreateUserParams) {
	return prisma.users.create({ data });
}

async function findByEmail(email: string) {
	return prisma.users.findUnique({
		where: {
			email,
		},
	});
}

async function findByUsername(username: string) {
	return prisma.users.findUnique({
		where: {
			username,
		},
	});
}

async function findById(id: number) {
	return prisma.users.findUnique({
		where: {
			id,
		},
	});
}

const userRepository = {
	create,
	findByEmail,
	findByUsername,
	findById,
};

export default userRepository;
