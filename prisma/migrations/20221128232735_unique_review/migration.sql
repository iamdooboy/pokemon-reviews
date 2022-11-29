/*
  Warnings:

  - A unique constraint covering the columns `[authorId,pokemon]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Review_authorId_pokemon_key" ON "Review"("authorId", "pokemon");
