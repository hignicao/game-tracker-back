import { Game } from "@/protocols";
import { prisma } from "config";

async function create(data: Game) {
	// return prisma.games.create({
	// 	data,
	// });
}

async function findById(id: number) {
	return prisma.games.findUnique({
		where: {
			id,
		},
	});
}

const gameRepository = {
	create,
	findById,
};

export default gameRepository;
