import prisma from "../config/db.js";

export async function createPointsTable(data, db = prisma) {
    return await db.pointsTable.create({
        data,
        include: {
            team: true,
            tournament: true
        }
    });
}

export async function createManyPointsTables(data, db = prisma) {
    return await db.pointsTable.createMany({
        data,
        skipDuplicates: true
    });
}

export async function getPointsTableById(id, db = prisma) {
    return await db.pointsTable.findUnique({
        where: { id },
        include: {
            team: true,
            tournament: true
        }
    });
}

export async function getPointsTableByTournament(tournamentId, db = prisma) {
    return await db.pointsTable.findMany({
        where: {
            tournamentId
        },
        include: {
            team: true
        },
        orderBy: [
            {
                position: "asc"
            },
            {
                points: "desc"
            },
            {
                netRunRate: "desc"
            }
        ]
    });
}

export async function getPointsTableByTeam(tournamentId,teamId,db = prisma) {
    return await db.pointsTable.findUnique({
        where: {
            tournamentId_teamId: {
                tournamentId,
                teamId
            }
        },
        include: {
            team: true,
            tournament: true
        }
    });
}

export async function existsPointsTable(tournamentId,teamId,db = prisma) {
    const record = await db.pointsTable.findUnique({
        where: {
            tournamentId_teamId: {
                tournamentId,
                teamId
            }
        },
        select: {
            id: true
        }
    });

    return !!record;
}

export async function updatePointsTable(id, data, db = prisma) {
    return await db.pointsTable.update({
        where: {
            id
        },
        data,
        include: {
            team: true,
            tournament: true
        }
    });
}

export async function updatePointsTableByTeam(tournamentId,teamId,data,db = prisma) {
    return await db.pointsTable.update({
        where: {
            tournamentId_teamId: {
                tournamentId,
                teamId
            }
        },
        data,
        include: {
            team: true,
            tournament: true
        }
    });
}

export async function deletePointsTable(id, db = prisma) {
    return await db.pointsTable.delete({
        where: {
            id
        }
    });
}

export async function deleteTournamentPointsTable(tournamentId,db = prisma) {
    return await db.pointsTable.deleteMany({
        where: {
            tournamentId
        }
    });
}

export async function updatePositions(standings, db = prisma) {
    const updates = standings.map((team, index) =>
        db.pointsTable.update({
            where: {
                id: team.id
            },
            data: {
                position: index + 1
            }
        })
    );

    if (db.$transaction) {
        return await db.$transaction(updates);
    }

    return await Promise.all(updates);
}