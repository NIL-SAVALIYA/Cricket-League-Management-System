/*
  Warnings:

  - Added the required column `deliveryNumber` to the `Ball` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MatchResultType" AS ENUM ('RUNS', 'WICKETS', 'TIE', 'NO_RESULT');

-- AlterTable
ALTER TABLE "Ball" ADD COLUMN     "deliveryNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "result" TEXT,
ADD COLUMN     "winnerTeamId" TEXT,
ADD COLUMN     "winningMargin" TEXT;

-- CreateTable
CREATE TABLE "PlayingXI" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "battingOrder" INTEGER NOT NULL,
    "isCaptain" BOOLEAN NOT NULL DEFAULT false,
    "isWicketKeeper" BOOLEAN NOT NULL DEFAULT false,
    "isSubstitute" BOOLEAN NOT NULL DEFAULT false,
    "isImpactPlayer" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayingXI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FallOfWicket" (
    "id" TEXT NOT NULL,
    "inningsId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "wicketNumber" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "batsmanRuns" INTEGER NOT NULL,
    "over" TEXT NOT NULL,
    "ball" INTEGER NOT NULL,
    "wicketType" "WicketType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FallOfWicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partnership" (
    "id" TEXT NOT NULL,
    "inningsId" TEXT NOT NULL,
    "strikerId" TEXT NOT NULL,
    "nonStrikerId" TEXT NOT NULL,
    "runs" INTEGER NOT NULL DEFAULT 0,
    "balls" INTEGER NOT NULL DEFAULT 0,
    "fours" INTEGER NOT NULL DEFAULT 0,
    "sixes" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partnership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlayingXI_matchId_idx" ON "PlayingXI"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayingXI_matchId_playerId_key" ON "PlayingXI"("matchId", "playerId");

-- CreateIndex
CREATE INDEX "FallOfWicket_inningsId_idx" ON "FallOfWicket"("inningsId");

-- CreateIndex
CREATE INDEX "Partnership_inningsId_idx" ON "Partnership"("inningsId");

-- CreateIndex
CREATE INDEX "Ball_inningsId_idx" ON "Ball"("inningsId");

-- CreateIndex
CREATE INDEX "Ball_deliveryNumber_idx" ON "Ball"("deliveryNumber");

-- CreateIndex
CREATE INDEX "Ball_inningsId_deliveryNumber_idx" ON "Ball"("inningsId", "deliveryNumber");

-- CreateIndex
CREATE INDEX "BattingScorecard_inningsId_idx" ON "BattingScorecard"("inningsId");

-- CreateIndex
CREATE INDEX "BattingScorecard_playerId_idx" ON "BattingScorecard"("playerId");

-- CreateIndex
CREATE INDEX "BowlingScorecard_inningsId_idx" ON "BowlingScorecard"("inningsId");

-- CreateIndex
CREATE INDEX "BowlingScorecard_bowlerId_idx" ON "BowlingScorecard"("bowlerId");

-- CreateIndex
CREATE INDEX "Innings_matchId_idx" ON "Innings"("matchId");

-- CreateIndex
CREATE INDEX "Innings_status_idx" ON "Innings"("status");

-- CreateIndex
CREATE INDEX "Match_tournamentId_idx" ON "Match"("tournamentId");

-- CreateIndex
CREATE INDEX "Match_status_idx" ON "Match"("status");

-- CreateIndex
CREATE INDEX "Match_winnerTeamId_idx" ON "Match"("winnerTeamId");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_winnerTeamId_fkey" FOREIGN KEY ("winnerTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayingXI" ADD CONSTRAINT "PlayingXI_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayingXI" ADD CONSTRAINT "PlayingXI_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayingXI" ADD CONSTRAINT "PlayingXI_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FallOfWicket" ADD CONSTRAINT "FallOfWicket_inningsId_fkey" FOREIGN KEY ("inningsId") REFERENCES "Innings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FallOfWicket" ADD CONSTRAINT "FallOfWicket_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partnership" ADD CONSTRAINT "Partnership_inningsId_fkey" FOREIGN KEY ("inningsId") REFERENCES "Innings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partnership" ADD CONSTRAINT "Partnership_strikerId_fkey" FOREIGN KEY ("strikerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partnership" ADD CONSTRAINT "Partnership_nonStrikerId_fkey" FOREIGN KEY ("nonStrikerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
