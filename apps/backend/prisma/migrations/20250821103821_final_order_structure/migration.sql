-- AlterTable
ALTER TABLE "BuyerOrder" ADD COLUMN     "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "deliveryProfileId" INTEGER;

-- AlterTable
ALTER TABLE "SellerOrder" ADD COLUMN     "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "DeliveryProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "dayWeight" JSONB NOT NULL,

    CONSTRAINT "DeliveryProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryProfile_code_key" ON "DeliveryProfile"("code");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_deliveryProfileId_fkey" FOREIGN KEY ("deliveryProfileId") REFERENCES "DeliveryProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
