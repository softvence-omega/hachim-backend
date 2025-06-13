-- CreateTable
CREATE TABLE "Relapse" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "Mood" INTEGER NOT NULL,
    "urg" INTEGER NOT NULL,
    "Triggers" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "spendDate" TIMESTAMP(3) NOT NULL,
    "level" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Relapse_pkey" PRIMARY KEY ("id")
);
