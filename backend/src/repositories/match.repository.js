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

//

/*
|--------------------------------------------------------------------------
| Create Multiple Matches
|--------------------------------------------------------------------------
*/

export async function createManyMatches(data) {

    return prisma.match.createMany({

        data

    });

}

/*
|--------------------------------------------------------------------------
| Get Matches By Tournament
|--------------------------------------------------------------------------
*/

export async function getMatchesByTournament(tournamentId) {

    return prisma.match.findMany({

        where: {
            tournamentId
        },

        include: {

            tournament: true,

            teamA: {
                select: {
                    id: true,
                    name: true,
                    shortName: true
                }
            },

            teamB: {
                select: {
                    id: true,
                    name: true,
                    shortName: true
                }
            },

            tossWinner: {
                select: {
                    id: true,
                    name: true,
                    shortName: true
                }
            }

        },

        orderBy: {
            matchDate: "asc"
        }

    });

}

/*
|--------------------------------------------------------------------------
| Count Matches By Tournament
|--------------------------------------------------------------------------
*/

export async function countMatchesByTournament(tournamentId) {

    return prisma.match.count({

        where: {
            tournamentId
        }

    });

}