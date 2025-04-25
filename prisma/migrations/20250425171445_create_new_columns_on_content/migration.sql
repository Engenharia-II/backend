/*
  Warnings:

  - Added the required column `duration` to the `contents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contents" ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "is_free" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "thumbnail_url" TEXT;
