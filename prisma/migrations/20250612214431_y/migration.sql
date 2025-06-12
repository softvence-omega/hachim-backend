/*
  Warnings:

  - You are about to drop the column `level` on the `MotivationTrack` table. All the data in the column will be lost.
  - Added the required column `motivation` to the `MotivationTrack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MotivationTrack" DROP COLUMN "level",
ADD COLUMN     "motivation" TEXT NOT NULL;
