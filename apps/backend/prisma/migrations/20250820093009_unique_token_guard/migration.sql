/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,replacedById]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_sessionId_replacedById_key" ON "RefreshToken"("sessionId", "replacedById");
