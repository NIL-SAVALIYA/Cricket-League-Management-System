import prisma from "../config/prisma.js";

const battingScorecardInclude = {

    innings: true,

    player: true,

    bowler: true,

    fielder: true

};

export async function createBattingScorecard(data, db = prisma) {

    return await db.battingScorecard.create({
        data,
        include: battingScorecardInclude

    });
}

export async function createManyBattingScorecards(data,db = prisma) {

    return await db.battingScorecard.createMany({
        data
    });
}

export async function getAllBattingScorecards(db = prisma) {

    return await db.battingScorecard.findMany({

        include: battingScorecardInclude,

        orderBy: [
            {
                battingPosition: "asc"
            }
        ]
    });
}

export async function getBattingScorecardById( id, db = prisma) {

    return await db.battingScorecard.findUnique({

        where: {
            id
        },
        include: battingScorecardInclude
    });
}

export async function getBattingScorecardByPlayer(  inningsId,playerId, db = prisma) {

    return await db.battingScorecard.findFirst({
        where: {

            inningsId,

            playerId

        },
        include: battingScorecardInclude
    });
}

export async function getBattingScorecardsByInnings(inningsId,db = prisma) {

    return await db.battingScorecard.findMany({
        where: {

            inningsId
        },
        include: battingScorecardInclude,
        orderBy: {

            battingPosition: "asc"

        }
    });
}

export async function updateBattingScorecard( id,data,db = prisma) {

    return await db.battingScorecard.update({
        where: {
            id
        },
        data,
        include: battingScorecardInclude
    });
}

export async function deleteBattingScorecard( id, db = prisma) {

    return await db.battingScorecard.delete({
        where: {
            id
        }
    });
}

export async function deleteBattingScorecardsByInnings( inningsId,db = prisma) {

    return await db.battingScorecard.deleteMany({

        where: {
            inningsId
        }
    });
}

export async function existsBattingScorecard(inningsId, playerId, db = prisma) {

    const scorecard = await db.battingScorecard.findFirst({
        where: {
            inningsId,
            playerId
        },
        select: {
            id: true
        }
    });

    return !!scorecard;

/*if (scorecard) {
            return true;
   } 
  else {
    return false;
   }  !!scorecard this function use instead of this if and else function*/

}