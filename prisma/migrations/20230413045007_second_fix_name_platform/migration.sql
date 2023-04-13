/*
  Warnings:

  - You are about to drop the column `plataformId` on the `GamePlatform` table. All the data in the column will be lost.
  - Added the required column `platformId` to the `GamePlatform` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GamePlatform" DROP CONSTRAINT "GamePlatform_plataformId_fkey";

-- AlterTable
ALTER TABLE "GamePlatform" DROP COLUMN "plataformId",
ADD COLUMN     "platformId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "GamePlatform" ADD CONSTRAINT "GamePlatform_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platforms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
