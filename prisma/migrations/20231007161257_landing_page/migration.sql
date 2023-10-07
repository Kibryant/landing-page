/*
  Warnings:

  - You are about to drop the column `created_at` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `postName` on the `Posts` table. All the data in the column will be lost.
  - Made the column `description` on table `Posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "created_at",
DROP COLUMN "postName",
ADD COLUMN     "category" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "description" SET NOT NULL;
