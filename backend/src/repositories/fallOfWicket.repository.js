import prisma from "../config/prisma.js";

const fallOfWicketInclude = {

    innings: true,
    player: true
};

export async function createFallOfWicket( data, db = prisma) {

    return await db.fallOfWicket.create({
        data,
        include: fallOfWicketInclude
    });
}

export async function createManyFallOfWickets(data,db = prisma) {

    return await db.fallOfWicket.createMany({
        data
    });

}

export async function getAllFallOfWickets(db = prisma) {

    return await db.fallOfWicket.findMany({

        include: fallOfWicketInclude,
        orderBy: [

            {
                wicketNumber: "asc"
            }
        ]
    });
}

export async function getFallOfWicketById( id,db = prisma) {

    return await db.fallOfWicket.findUnique({

        where: {
            id
        },
        include: fallOfWicketInclude
    });
}

export async function getFallOfWicketsByInnings(inningsId,db = prisma) {

    return await db.fallOfWicket.findMany({
        where: {
            inningsId
        },
        include: fallOfWicketInclude,
        orderBy: {

            wicketNumber: "asc"

        }
    });
}

export async function getFallOfWicketByPlayer( inningsId, playerId, db = prisma) {

    return await db.fallOfWicket.findFirst({

        where: {
            inningsId,
            playerId
        },
        include: fallOfWicketInclude
    });
}

export async function getLatestFallOfWicket( inningsId,db = prisma) {

    return await db.fallOfWicket.findFirst({
        where: {
            inningsId
        },
        include: fallOfWicketInclude,
        orderBy: {

            wicketNumber: "desc"

        }
    });
}

export async function updateFallOfWicket(id,data,db = prisma) {

    return await db.fallOfWicket.update({

        where: {
          id
        },
        data,
        include: fallOfWicketInclude
    });
}

export async function deleteFallOfWicket(id, db = prisma) {

    return await db.fallOfWicket.delete({
        where: {
            id
        }
    });

}

export async function deleteFallOfWicketsByInnings(inningsId, db = prisma) {

    return await db.fallOfWicket.deleteMany({

        where: {
            inningsId
        }
    });
}

export async function countFallOfWickets(inningsId,db = prisma) {

    return await db.fallOfWicket.count({

        where: {
            inningsId
        }
    });
}

export async function existsFallOfWicket(inningsId,playerId,db = prisma) {

    const wicket = await db.fallOfWicket.findFirst({

        where: {
            inningsId,
            playerId
        },
        select: {
          id: true
        }
    });
    return !!wicket;
}

export async function getFallOfWicketByNumber( inningsId,wicketNumber, db = prisma) {

    return await db.fallOfWicket.findFirst({

        where: {
            inningsId,
            wicketNumber
        },
        include: fallOfWicketInclude
    });
}

export async function getHighestScoreBeforeWicket(inningsId,db = prisma) {

    return await db.fallOfWicket.findFirst({

        where: {
            inningsId
        },
        orderBy: {
            score: "desc"
        },
        include: fallOfWicketInclude
    });
}