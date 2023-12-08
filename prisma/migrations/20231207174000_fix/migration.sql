/*
  Warnings:

  - The primary key for the `task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `task` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - The required column `_id` was added to the `task` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `_id` was added to the `user` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_userId_fkey";

-- DropIndex
DROP INDEX "user_id_key";

-- AlterTable
ALTER TABLE "task" DROP CONSTRAINT "task_pkey",
DROP COLUMN "id",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD CONSTRAINT "task_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "id",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("_id");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
