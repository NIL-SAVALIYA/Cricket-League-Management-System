import prisma from "../config/db.js";

export async function createTeam(data) {
    return prisma.team.create({
        data,
        include: {
            manager: true
        }
    });
}

export async function getAllTeams() {
    return prisma.team.findMany({
        include: {
            manager: true
        }
    });
}

export async function getTeamById(id) {
    return prisma.team.findUnique({
        where: {
            id
        },
        include: {
            manager: true
        }
    });
}

export async function updateTeam(id, data) {
    return prisma.team.update({
        where: {
            id
        },
        data,
        include: {
            manager: true
        }
    });
}

export async function deleteTeam(id) {
    return prisma.team.delete({
        where: {
            id
        }
    });
}

export async function findTeamByName(name) {
    return prisma.team.findUnique({
        where: {
            name
        }
    });
}

export async function findTeamByShortName(shortName) {
    return prisma.team.findUnique({
        where: {
            shortName
        }
    });
}