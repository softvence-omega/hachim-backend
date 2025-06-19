/*
  Warnings:

  - You are about to drop the column `email` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_email_fkey";

-- DropIndex
DROP INDEX "Payment_email_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "email",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_userId_key" ON "Payment"("userId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
