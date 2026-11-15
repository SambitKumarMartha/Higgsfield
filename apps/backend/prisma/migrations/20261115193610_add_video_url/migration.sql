/*
  Warnings:

  - Added the required column `url` to the `AvatarVideo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvatarVideo" ADD COLUMN     "url" TEXT NOT NULL;
