/*
  Warnings:

  - Added the required column `userId` to the `Relapse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Relapse" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Relapse" ADD CONSTRAINT "Relapse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
