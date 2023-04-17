import * as jwt from "jsonwebtoken";
import { Users } from "@prisma/client";

import { createUser } from "./factories";
import { prisma } from "../src/config/database";

export async function cleanDb() {
	// await prisma.address.deleteMany({});
	// await prisma.payment.deleteMany({});
	// await prisma.ticket.deleteMany({});
	// await prisma.enrollment.deleteMany({});
	// await prisma.event.deleteMany({});
	// await prisma.session.deleteMany({});
	// await prisma.booking.deleteMany({});
	// await prisma.ticketType.deleteMany({});
	// await prisma.room.deleteMany({});
	// await prisma.hotel.deleteMany({});
	// await prisma.subscriptions.deleteMany({});
	// await prisma.user.deleteMany({});
	// await prisma.activity.deleteMany({})
  await prisma.users.deleteMany({});
}

export async function generateValidToken(user?: Users) {
	const incomingUser = user || (await createUser());
	const token = jwt.sign({ userId: incomingUser.id }, process.env.SECRET_JWT);

	return token;
}
