/*
  Warnings:

  - You are about to drop the `content_access` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "content_access" DROP CONSTRAINT "content_access_content_id_fkey";

-- DropForeignKey
ALTER TABLE "content_access" DROP CONSTRAINT "content_access_user_id_fkey";

-- DropTable
DROP TABLE "content_access";
