/*
  Warnings:

  - A unique constraint covering the columns `[relapseId]` on the table `MoodTrack` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[relapseId]` on the table `MotivationTrack` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[relapseId]` on the table `SleepTrack` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `relapseId` to the `MoodTrack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relapseId` to the `MotivationTrack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relapseId` to the `SleepTrack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MoodTrack" ADD COLUMN     "relapseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MotivationTrack" ADD COLUMN     "relapseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SleepTrack" ADD COLUMN     "relapseId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MoodTrack_relapseId_key" ON "MoodTrack"("relapseId");

-- CreateIndex
CREATE UNIQUE INDEX "MotivationTrack_relapseId_key" ON "MotivationTrack"("relapseId");

-- CreateIndex
CREATE UNIQUE INDEX "SleepTrack_relapseId_key" ON "SleepTrack"("relapseId");

-- AddForeignKey
ALTER TABLE "MoodTrack" ADD CONSTRAINT "MoodTrack_relapseId_fkey" FOREIGN KEY ("relapseId") REFERENCES "Relapse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepTrack" ADD CONSTRAINT "SleepTrack_relapseId_fkey" FOREIGN KEY ("relapseId") REFERENCES "Relapse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotivationTrack" ADD CONSTRAINT "MotivationTrack_relapseId_fkey" FOREIGN KEY ("relapseId") REFERENCES "Relapse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
