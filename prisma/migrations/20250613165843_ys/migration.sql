/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Relapse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Relapse_userId_key" ON "Relapse"("userId");
