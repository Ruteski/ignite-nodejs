/*
  Warnings:

  - You are about to drop the column `validated_ate` on the `check_ins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "validated_ate",
ADD COLUMN     "validated_at" TIMESTAMP(3);
