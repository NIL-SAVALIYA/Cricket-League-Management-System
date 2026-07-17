import {
    createMatch,
    getAllMatches,
    getMatchById,
    updateMatch,
    deleteMatch
} from "../repositories/match.repository.js";

import {
    getTeamById
} from "../repositories/team.repository.js";


/*
|--------------------------------------------------------------------------
| Create Match
|--------------------------------------------------------------------------
*/

export async function createMatchService(matchData) {

    // Check Team A exists
    const teamA = await getTeamById(matchData.teamAId);

    if (!teamA) {
        throw new Error("Team A not found.");
    }

    // Check Team B exists
    const teamB = await getTeamById(matchData.teamBId);

    if (!teamB) {
        throw new Error("Team B not found.");
    }

    // Team A and Team B cannot be the same
    if (matchData.teamAId === matchData.teamBId) {
        throw new Error("Team A and Team B cannot be the same.");
    }

    // Toss winner must be one of the playing teams
    if (
        matchData.tossWinnerId &&
        matchData.tossWinnerId !== matchData.teamAId &&
        matchData.tossWinnerId !== matchData.teamBId
    ) {
        throw new Error(
            "Toss winner must be either Team A or Team B."
        );
    }

    // Create Match
    return await createMatch(matchData);
}

/*
|--------------------------------------------------------------------------
| Get All Matches
|--------------------------------------------------------------------------
*/

export async function getAllMatchesService() {

    return await getAllMatches();

}

/*
|--------------------------------------------------------------------------
| Get Match By ID
|--------------------------------------------------------------------------
*/

export async function getMatchByIdService(id) {

    const match = await getMatchById(id);

    if (!match) {
        throw new Error("Match not found.");
    }

    return match;
}

/*
|--------------------------------------------------------------------------
| Update Match
|--------------------------------------------------------------------------
*/

export async function updateMatchService(id, matchData) {

    // Check match exists
    const match = await getMatchById(id);

    if (!match) {
        throw new Error("Match not found.");
    }

    // Validate Team A if updating
    if (matchData.teamAId) {

        const teamA = await getTeamById(matchData.teamAId);

        if (!teamA) {
            throw new Error("Team A not found.");
        }
    }

    // Validate Team B if updating
    if (matchData.teamBId) {

        const teamB = await getTeamById(matchData.teamBId);

        if (!teamB) {
            throw new Error("Team B not found.");
        }
    }

    // Determine final Team A and Team B
    const teamAId = matchData.teamAId || match.teamAId;
    const teamBId = matchData.teamBId || match.teamBId;

    // Same team validation
    if (teamAId === teamBId) {
        throw new Error("Team A and Team B cannot be the same.");
    }

    // Toss Winner validation
    if (
        matchData.tossWinnerId &&
        matchData.tossWinnerId !== teamAId &&
        matchData.tossWinnerId !== teamBId
    ) {
        throw new Error(
            "Toss winner must be either Team A or Team B."
        );
    }

    return await updateMatch(id, matchData);
}

/*
|--------------------------------------------------------------------------
| Delete Match
|--------------------------------------------------------------------------
*/

export async function deleteMatchService(id) {

    const match = await getMatchById(id);

    if (!match) {
        throw new Error("Match not found.");
    }

    return await deleteMatch(id);
}