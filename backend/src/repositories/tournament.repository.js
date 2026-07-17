import prisma from "../config/db.js";

/*
|--------------------------------------------------------------------------
| Create Tournament
|--------------------------------------------------------------------------
*/

export async function createTournament(data) {

    return prisma.tournament.create({

        data

    });

}

/*
|--------------------------------------------------------------------------
| Get All Tournaments
|--------------------------------------------------------------------------
*/

export async function getAllTournaments() {

    return prisma.tournament.findMany({

        orderBy: {

            startDate: "desc"

        }

    });

}

/*
|--------------------------------------------------------------------------
| Get Tournament By ID
|--------------------------------------------------------------------------
*/

export async function getTournamentById(id) {

    return prisma.tournament.findUnique({

        where: {

            id

        }

    });

}

/*
|--------------------------------------------------------------------------
| Update Tournament
|--------------------------------------------------------------------------
*/

export async function updateTournament(id, data) {

    return prisma.tournament.update({

        where: {

            id

        },

        data

    });

}

/*
|--------------------------------------------------------------------------
| Delete Tournament
|--------------------------------------------------------------------------
*/

export async function deleteTournament(id) {

    return prisma.tournament.delete({

        where: {

            id

        }

    });

}

/*
|--------------------------------------------------------------------------
| Find Tournament By Name
|--------------------------------------------------------------------------
*/

export async function findTournamentByName(name) {

    return prisma.tournament.findUnique({

        where: {

            name

        }

    });

}