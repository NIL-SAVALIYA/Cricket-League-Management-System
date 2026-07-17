import prisma from "../config/db.js";

export async function createMatch(data) {
    return prisma.match.create({
        data,
        include: {
            teamA: true,
            teamB: true,
            tossWinner: true
        }
    });
}

export async function getAllMatches() {
    return prisma.match.findMany({
        include: {
            teamA: true,
            teamB: true,
            tossWinner: true
        },
        orderBy: {
            matchDate: "asc"
        }
    });
}

export async function getMatchById(id) {
    return prisma.match.findUnique({
        where: { id },
        include: {
            teamA: true,
            teamB: true,
            tossWinner: true
        }
    });
}

export async function updateMatch(id, data) {
    return prisma.match.update({
        where: { id },
        data,
        include: {
            teamA: true,
            teamB: true,
            tossWinner: true
        }
    });
}

export async function deleteMatch(id) {
    return prisma.match.delete({
        where: { id }
    });
}