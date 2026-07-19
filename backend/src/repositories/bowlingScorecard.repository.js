import prisma from "../config/prisma.js";

const bowlingScorecardInclude = {

    innings: true,
    bowler: true
};

export async function createBowlingScorecard(data,db = prisma) {

    return await db.bowlingScorecard.create({
        data,
        include: bowlingScorecardInclude
    });
}

export async function createManyBowlingScorecards(data,db = prisma) {

    return await db.bowlingScorecard.createMany({
        data
    });
}

export async function getAllBowlingScorecards(db = prisma) {

    return await db.bowlingScorecard.findMany({
        include: bowlingScorecardInclude,
        orderBy: {
            createdAt: "asc"
        }
    });
}

export async function getBowlingScorecardById(id, db = prisma) {

    return await db.bowlingScorecard.findUnique({
        where: {
           id
        },
        include: bowlingScorecardInclude
    });
}

export async function getBowlingScorecardByPlayer(inningsId,bowlerId,db = prisma) {

    return await db.bowlingScorecard.findFirst({
        where: {
            inningsId,
            bowlerId
        },
        include: bowlingScorecardInclude
    });
}

export async function getBowlingScorecardsByInnings(inningsId,db = prisma) {

    return await db.bowlingScorecard.findMany({
        where: {
            inningsId
        },
        include: bowlingScorecardInclude,
        orderBy: [
            {
                wickets: "desc"
            },
            {
                economy: "asc"
            }
        ]
    });
}

export async function updateBowlingScorecard( id,data,db = prisma) {

    return await db.bowlingScorecard.update({
        where: {
            id
        },
        data,
        include: bowlingScorecardInclude
    });
}

export async function deleteBowlingScorecard(id,db = prisma) {

    return await db.bowlingScorecard.delete({
        where: {
          id
        }
    });
}

export async function deleteBowlingScorecardsByInnings(inningsId,db = prisma) {

    return await db.bowlingScorecard.deleteMany({
        where: {
            inningsId
        }
    });
}

export async function existsBowlingScorecard(inningsId,bowlerId,db = prisma) {

    const scorecard = await db.bowlingScorecard.findFirst({

        where: {
            inningsId,
            bowlerId
        },
        select: {
            id: true
        }
    });
    return !!scorecard;
}

export async function getCurrentBowler(inningsId, db = prisma) {
    return await db.bowlingScorecard.findFirst({
        where: {
            inningsId
        },
        include: bowlingScorecardInclude,
        orderBy: [
            {
                updatedAt: "desc"
            }
        ]
    });
}