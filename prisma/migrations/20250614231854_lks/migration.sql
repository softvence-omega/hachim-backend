-- CreateTable
CREATE TABLE "Symptoms" (
    "id" TEXT NOT NULL,
    "mental" TEXT NOT NULL,
    "physical" TEXT NOT NULL,
    "social" TEXT NOT NULL,
    "faith" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Symptoms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Symptoms_userId_key" ON "Symptoms"("userId");

-- AddForeignKey
ALTER TABLE "Symptoms" ADD CONSTRAINT "Symptoms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
