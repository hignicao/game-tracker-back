import { prisma } from "config";

async function getUserCollection(userId: number) {
	return prisma.userCollection.findMany({
		where: {
			userId: userId,
		},
		select: {
			Games: {
				select: {
					id: true,
					name: true,
					cover: true,
					rating: true,
				},
			},
			statusId: true,
		},
	});
}

const collectionRepository = {
	getUserCollection,
};

export default collectionRepository;
