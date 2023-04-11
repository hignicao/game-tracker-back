/*
  Warnings:

  - You are about to drop the `GamePlataform` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Plataforms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GamePlataform" DROP CONSTRAINT "GamePlataform_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GamePlataform" DROP CONSTRAINT "GamePlataform_plataformId_fkey";

-- DropForeignKey
ALTER TABLE "UserCollection" DROP CONSTRAINT "UserCollection_userId_fkey";

-- DropTable
DROP TABLE "GamePlataform";

-- DropTable
DROP TABLE "Plataforms";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "GamePlatform" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "plataformId" INTEGER NOT NULL,

    CONSTRAINT "GamePlatform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Platforms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Platforms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "GamePlatform" ADD CONSTRAINT "GamePlatform_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePlatform" ADD CONSTRAINT "GamePlatform_plataformId_fkey" FOREIGN KEY ("plataformId") REFERENCES "Platforms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollection" ADD CONSTRAINT "UserCollection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
