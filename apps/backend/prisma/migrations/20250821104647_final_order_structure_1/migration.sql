/*
  Warnings:

  - Made the column `deliveryProfileId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_deliveryProfileId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "deliveryProfileId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_deliveryProfileId_fkey" FOREIGN KEY ("deliveryProfileId") REFERENCES "DeliveryProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
