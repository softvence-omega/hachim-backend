/*
  Warnings:

  - The `spendDate` column on the `Relapse` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Relapse" DROP COLUMN "spendDate",
ADD COLUMN     "spendDate" INTEGER;
