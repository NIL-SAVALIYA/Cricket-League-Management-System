import prisma from "../config/db.js";

export async function createPlayer(data,db=prisma) {
    return db.player.create({
        data,
        include: {
            team: true
        }
    });
}

export async function getAllPlayers(db=prisma) {
    return db.player.findMany({
        include: {
            team: true
        }
    });
}

export async function getPlayerById(id,db=prisma) {
    return db.player.findUnique({
        where: { id },
        include: {
            team: true
        }
    });
}

export async function updatePlayer(id, data,db=prisma) {
    return db.player.update({
        where: { id },
        data,
        include: {
            team: true
        }
    });
}

export async function deletePlayer(id,db=prisma) {
    return db.player.delete({
        where: { id }
    });
}

export async function getPlayersByTeam(teamId, db = prisma) {

    return await db.player.findMany({

        where: {
            teamId
        },

        orderBy: {
            jerseyNumber: "asc"
        }

    });

}