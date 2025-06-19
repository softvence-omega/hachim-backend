/*
  Warnings:

  - You are about to drop the column `userId` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropIndex
DROP INDEX "Payment_userId_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_email_key" ON "Payment"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_email_fkey" FOREIGN KEY ("email") REFERENCES "Payment"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
