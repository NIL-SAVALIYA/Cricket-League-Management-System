import {
    createTournament,
    getAllTournaments,
    getTournamentById,
    updateTournament,
    deleteTournament,
    findTournamentByName
} from "../repositories/tournament.repository.js";

/*
|--------------------------------------------------------------------------
| Create Tournament
|--------------------------------------------------------------------------
*/

export async function createTournamentService(tournamentData) {

    // Check duplicate tournament name
    const existingTournament = await findTournamentByName(
        tournamentData.name
    );

    if (existingTournament) {
        throw new Error("Tournament name already exists.");
    }

    return await createTournament(tournamentData);
}

/*
|--------------------------------------------------------------------------
| Get All Tournaments
|--------------------------------------------------------------------------
*/

export async function getAllTournamentsService() {

    return await getAllTournaments();

}

/*
|--------------------------------------------------------------------------
| Get Tournament By ID
|--------------------------------------------------------------------------
*/

export async function getTournamentByIdService(id) {

    const tournament = await getTournamentById(id);

    if (!tournament) {
        throw new Error("Tournament not found.");
    }

    return tournament;
}

/*
|--------------------------------------------------------------------------
| Update Tournament
|--------------------------------------------------------------------------
*/

export async function updateTournamentService(id, tournamentData) {

    const tournament = await getTournamentById(id);

    if (!tournament) {
        throw new Error("Tournament not found.");
    }

    // Check duplicate name
    if (
        tournamentData.name &&
        tournamentData.name !== tournament.name
    ) {

        const existingTournament =
            await findTournamentByName(
                tournamentData.name
            );

        if (existingTournament) {
            throw new Error("Tournament name already exists.");
        }
    }

    return await updateTournament(id, tournamentData);
}

/*
|--------------------------------------------------------------------------
| Delete Tournament
|--------------------------------------------------------------------------
*/

export async function deleteTournamentService(id) {

    const tournament = await getTournamentById(id);

    if (!tournament) {
        throw new Error("Tournament not found.");
    }

    // Prevent deleting a LIVE tournament
    if (tournament.status === "LIVE") {
        throw new Error(
            "Live tournaments cannot be deleted."
        );
    }

    return await deleteTournament(id);
}