-- CreateTable
CREATE TABLE "UserRecovery" (
    "userId" TEXT NOT NULL,
    "streakDays" INTEGER NOT NULL DEFAULT 0,
    "sleepScore" INTEGER NOT NULL DEFAULT 0,
    "moodScore" INTEGER NOT NULL DEFAULT 0,
    "recoveryPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "improvedConfidence" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "increasedLibido" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRecovery_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "UserRecovery" ADD CONSTRAINT "UserRecovery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
