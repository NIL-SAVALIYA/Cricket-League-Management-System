import prisma from "../config/db.js";

export async function createPlayer(data) {
    return prisma.player.create({
        data,
        include: {
            team: true
        }
    });
}

export async function getAllPlayers() {
    return prisma.player.findMany({
        include: {
            team: true
        }
    });
}

export async function getPlayerById(id) {
    return prisma.player.findUnique({
        where: { id },
        include: {
            team: true
        }
    });
}

export async function updatePlayer(id, data) {
    return prisma.player.update({
        where: { id },
        data,
        include: {
            team: true
        }
    });
}

export async function deletePlayer(id) {
    return prisma.player.delete({
        where: { id }
    });
}