-- CreateTable
CREATE TABLE "MoodTrack" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "relapseId" TEXT NOT NULL,

    CONSTRAINT "MoodTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleepTrack" (
    "id" TEXT NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "relapseId" TEXT NOT NULL,

    CONSTRAINT "SleepTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotivationTrack" (
    "id" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "relapseId" TEXT NOT NULL,

    CONSTRAINT "MotivationTrack_pkey" PRIMARY KEY ("id")
);

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
    "isDeleted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Relapse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MoodTrack_userId_key" ON "MoodTrack"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MoodTrack_relapseId_key" ON "MoodTrack"("relapseId");

-- CreateIndex
CREATE UNIQUE INDEX "SleepTrack_userId_key" ON "SleepTrack"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SleepTrack_relapseId_key" ON "SleepTrack"("relapseId");

-- CreateIndex
CREATE UNIQUE INDEX "MotivationTrack_userId_key" ON "MotivationTrack"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MotivationTrack_relapseId_key" ON "MotivationTrack"("relapseId");

-- AddForeignKey
ALTER TABLE "MoodTrack" ADD CONSTRAINT "MoodTrack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoodTrack" ADD CONSTRAINT "MoodTrack_relapseId_fkey" FOREIGN KEY ("relapseId") REFERENCES "Relapse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepTrack" ADD CONSTRAINT "SleepTrack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepTrack" ADD CONSTRAINT "SleepTrack_relapseId_fkey" FOREIGN KEY ("relapseId") REFERENCES "Relapse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotivationTrack" ADD CONSTRAINT "MotivationTrack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotivationTrack" ADD CONSTRAINT "MotivationTrack_relapseId_fkey" FOREIGN KEY ("relapseId") REFERENCES "Relapse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relapse" ADD CONSTRAINT "Relapse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
