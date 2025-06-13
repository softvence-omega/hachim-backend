/*
  Warnings:

  - You are about to drop the column `relapseId` on the `MoodTrack` table. All the data in the column will be lost.
  - You are about to drop the column `relapseId` on the `MotivationTrack` table. All the data in the column will be lost.
  - You are about to drop the column `relapseId` on the `SleepTrack` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MoodTrack" DROP CONSTRAINT "MoodTrack_relapseId_fkey";

-- DropForeignKey
ALTER TABLE "MotivationTrack" DROP CONSTRAINT "MotivationTrack_relapseId_fkey";

-- DropForeignKey
ALTER TABLE "SleepTrack" DROP CONSTRAINT "SleepTrack_relapseId_fkey";

-- DropIndex
DROP INDEX "MoodTrack_relapseId_key";

-- DropIndex
DROP INDEX "MotivationTrack_relapseId_key";

-- DropIndex
DROP INDEX "SleepTrack_relapseId_key";

-- AlterTable
ALTER TABLE "MoodTrack" DROP COLUMN "relapseId";

-- AlterTable
ALTER TABLE "MotivationTrack" DROP COLUMN "relapseId";

-- AlterTable
ALTER TABLE "SleepTrack" DROP COLUMN "relapseId";
