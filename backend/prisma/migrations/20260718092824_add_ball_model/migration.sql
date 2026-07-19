-- CreateTable
CREATE TABLE "Ball" (
    "id" TEXT NOT NULL,
    "inningsId" TEXT NOT NULL,
    "over" INTEGER NOT NULL,
    "ball" INTEGER NOT NULL,
    "batsmanId" TEXT NOT NULL,
    "bowlerId" TEXT NOT NULL,
    "nonStrikerId" TEXT NOT NULL,
    "batRuns" INTEGER NOT NULL DEFAULT 0,
    "extraRuns" INTEGER NOT NULL DEFAULT 0,
    "totalRuns" INTEGER NOT NULL DEFAULT 0,
    "extraType" "ExtraType" NOT NULL DEFAULT 'NONE',
    "isLegalDelivery" BOOLEAN NOT NULL DEFAULT true,
    "isBoundaryFour" BOOLEAN NOT NULL DEFAULT false,
    "isBoundarySix" BOOLEAN NOT NULL DEFAULT false,
    "isWicket" BOOLEAN NOT NULL DEFAULT false,
    "wicketType" "WicketType",
    "dismissedPlayerId" TEXT,
    "fielderId" TEXT,
    "commentary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ball_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ball" ADD CONSTRAINT "Ball_inningsId_fkey" FOREIGN KEY ("inningsId") REFERENCES "Innings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ball" ADD CONSTRAINT "Ball_batsmanId_fkey" FOREIGN KEY ("batsmanId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ball" ADD CONSTRAINT "Ball_nonStrikerId_fkey" FOREIGN KEY ("nonStrikerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ball" ADD CONSTRAINT "Ball_bowlerId_fkey" FOREIGN KEY ("bowlerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ball" ADD CONSTRAINT "Ball_dismissedPlayerId_fkey" FOREIGN KEY ("dismissedPlayerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ball" ADD CONSTRAINT "Ball_fielderId_fkey" FOREIGN KEY ("fielderId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
