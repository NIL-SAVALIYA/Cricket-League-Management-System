import {
    registerTeam,
    getAllRegisteredTeams,
    getRegistrationById,
    findRegistration,
    deleteRegistration,
    getTournamentTeams,
    getTeamTournaments
} from "../repositories/tournament-team.repository.js";

import {
    getTournamentById
} from "../repositories/tournament.repository.js";

import {
    getTeamById
} from "../repositories/team.repository.js";

/*
|--------------------------------------------------------------------------
| Register Team In Tournament
|--------------------------------------------------------------------------
*/

export async function registerTeamService(data) {

    // Check Tournament
    const tournament = await getTournamentById(data.tournamentId);

    if (!tournament) {
        throw new Error("Tournament not found.");
    }

    // Check Team
    const team = await getTeamById(data.teamId);

    if (!team) {
        throw new Error("Team not found.");
    }

    // Tournament status validation
    if (
        tournament.status === "LIVE" ||
        tournament.status === "COMPLETED"
    ) {
        throw new Error(
            "Cannot register team in a live or completed tournament."
        );
    }

    // Duplicate registration
    const existing = await findRegistration(
        data.tournamentId,
        data.teamId
    );

    if (existing) {
        throw new Error(
            "Team is already registered in this tournament."
        );
    }

    return await registerTeam(data);

}

/*
|--------------------------------------------------------------------------
| Get All Registrations
|--------------------------------------------------------------------------
*/

export async function getAllRegisteredTeamsService() {

    return await getAllRegisteredTeams();

}

/*
|--------------------------------------------------------------------------
| Get Registration By ID
|--------------------------------------------------------------------------
*/

export async function getRegistrationByIdService(id) {

    const registration = await getRegistrationById(id);

    if (!registration) {
        throw new Error("Registration not found.");
    }

    return registration;

}

/*
|--------------------------------------------------------------------------
| Remove Team From Tournament
|--------------------------------------------------------------------------
*/

export async function deleteRegistrationService(id) {

    const registration = await getRegistrationById(id);

    if (!registration) {
        throw new Error("Registration not found.");
    }

    if (
        registration.tournament.status === "LIVE" ||
        registration.tournament.status === "COMPLETED"
    ) {
        throw new Error(
            "Cannot remove team from a live or completed tournament."
        );
    }

    return await deleteRegistration(id);

}

/*
|--------------------------------------------------------------------------
| Get Teams Of Tournament
|--------------------------------------------------------------------------
*/

export async function getTournamentTeamsService(tournamentId) {

    const tournament = await getTournamentById(tournamentId);

    if (!tournament) {
        throw new Error("Tournament not found.");
    }

    return await getTournamentTeams(tournamentId);

}

/*
|--------------------------------------------------------------------------
| Get Tournaments Of Team
|--------------------------------------------------------------------------
*/

export async function getTeamTournamentsService(teamId) {

    const team = await getTeamById(teamId);

    if (!team) {
        throw new Error("Team not found.");
    }

    return await getTeamTournaments(teamId);

}