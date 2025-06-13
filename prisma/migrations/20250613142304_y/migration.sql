-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PAID', 'UNPAID');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'UNPAID';
