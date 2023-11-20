/*
  Warnings:

  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workSessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "workSessions" DROP CONSTRAINT "workSessions_accountId_fkey";

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "workSessions";

-- CreateTable
CREATE TABLE "usersTest" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usersTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasksTest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "dayToFinishTheTask" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "howMuchTimeIsLeft" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasksTest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usersTest_id_key" ON "usersTest"("id");

-- CreateIndex
CREATE UNIQUE INDEX "usersTest_email_key" ON "usersTest"("email");

-- AddForeignKey
ALTER TABLE "tasksTest" ADD CONSTRAINT "tasksTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usersTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
