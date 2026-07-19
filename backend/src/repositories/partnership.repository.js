import prisma from "../config/db.js";

const partnershipInclude = {
    innings: true,
    striker: true,
    nonStriker: true
};
export async function createPartnership( data, db = prisma) {

    return await db.partnership.create({
        data,
        include: partnershipInclude
    });
}

export async function getAllPartnerships(db = prisma) {

    return await db.partnership.findMany({
        include: partnershipInclude,
        orderBy: {
            createdAt: "asc"
        }
    });
}

export async function getPartnershipById(id,db = prisma) {

    return await db.partnership.findUnique({
        where: {
            id
        },
        include: partnershipInclude
    });
}

export async function getPartnershipsByInnings(inningsId,db = prisma) {

    return await db.partnership.findMany({
        where: {
            inningsId
        },
        include: partnershipInclude,
        orderBy: {
            createdAt: "asc"
        }
    });
}

export async function getActivePartnership(inningsId, db = prisma) {

    return await db.partnership.findFirst({
        where: {
            inningsId,
            isActive: true
        },
        include: partnershipInclude
    });
}

export async function updatePartnership(id,data,db = prisma) {

    return await db.partnership.update({
        where: {
            id
        },
        data,
        include: partnershipInclude
    });
}

export async function closePartnership(id, db = prisma) {

    return await db.partnership.update({
        where: {
            id
        },
        data: {
            isActive: false
        },
        include: partnershipInclude
    });
}

export async function deletePartnership(id,db = prisma) {

    return await db.partnership.delete({
        where: {
            id
        }
    });
}

export async function deletePartnershipsByInnings(inningsId,db = prisma) {

    return await db.partnership.deleteMany({
        where: {
            inningsId
        }
    });
}

export async function existsActivePartnership( inningsId,db = prisma) {

    const partnership = await db.partnership.findFirst({
        where: {
            inningsId,
            isActive: true
        },
        select: {
            id: true
        }
    });

    return !!partnership;

}

export async function getCurrentPartnershipPlayers( inningsId, db = prisma) {

    return await db.partnership.findFirst({
        where: {
            inningsId,
            isActive: true
        },
        select: {

            strikerId: true,

            nonStrikerId: true
        }
    });
}

export async function countPartnershipsByInnings(inningsId,db = prisma) {

    return await db.partnership.count({
        where: {
            inningsId
         }
    });
}

export async function getHighestPartnership(inningsId,db = prisma) {

    return await db.partnership.findFirst({
        where: {
             inningsId
        },
        include: partnershipInclude,
        orderBy: {
            runs: "desc"
        }
    });
}

export async function getCurrentPartnershipRuns(inningsId, db = prisma) {

    return await db.partnership.findFirst({
        where: {
            inningsId,
            isActive: true
        },
        select: {

            runs: true,

            balls: true,

            fours: true,

            sixes: true
        }
    });
}

export async function getPartnershipByPlayers( inningsId, strikerId, nonStrikerId, db = prisma) {

    return await db.partnership.findFirst({

        where: {
            inningsId,
            isActive: true,

            OR: [

                {
                    strikerId,
                    nonStrikerId
                },
                {
                    strikerId: nonStrikerId,
                    nonStrikerId: strikerId
                }
            ]
        },
        include: partnershipInclude
    });
}

export async function deactivateAllPartnerships(inningsId, db = prisma) {

    return await db.partnership.updateMany({
        where: {
            inningsId,
            isActive: true
        },
        data: {
            isActive: false
        }
    });
}

export async function getLastPartnership(inningsId, db = prisma) {

    return await db.partnership.findFirst({
        where: {
            inningsId
        },

        include: partnershipInclude,
        orderBy: {
            createdAt: "desc"
        }
    });
}