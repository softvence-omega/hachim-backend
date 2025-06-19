-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);
