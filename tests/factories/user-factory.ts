import bcrypt from "bcrypt";
import { Users } from "@prisma/client";
import { prisma } from "../../src/config/database";
import { faker } from '@faker-js/faker';

export async function createUser(params: Partial<Users> = {}): Promise<Users> {
  const incomingPassword = params.password || faker.internet.password(6);
	const hashedPassword = await bcrypt.hash(incomingPassword, 12);

  return prisma.users.create({
    data: {
      name: params.name || faker.name.fullName(),
      username: params.username || faker.internet.userName(),
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  });
}
