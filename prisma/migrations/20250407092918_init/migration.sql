/*
  Warnings:

  - The primary key for the `icons` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "icons" DROP CONSTRAINT "icons_pkey",
ADD CONSTRAINT "icons_pkey" PRIMARY KEY ("avatarKey");
