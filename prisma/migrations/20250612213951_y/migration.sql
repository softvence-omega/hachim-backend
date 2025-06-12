-- CreateTable
CREATE TABLE "MoodTrack" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MoodTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleepTrack" (
    "id" TEXT NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SleepTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotivationTrack" (
    "id" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MotivationTrack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MoodTrack_userId_key" ON "MoodTrack"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SleepTrack_userId_key" ON "SleepTrack"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MotivationTrack_userId_key" ON "MotivationTrack"("userId");

-- AddForeignKey
ALTER TABLE "MoodTrack" ADD CONSTRAINT "MoodTrack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepTrack" ADD CONSTRAINT "SleepTrack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotivationTrack" ADD CONSTRAINT "MotivationTrack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
