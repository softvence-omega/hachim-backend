/*
  Warnings:

  - Added the required column `isDeleted` to the `Relapse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Relapse" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL;
