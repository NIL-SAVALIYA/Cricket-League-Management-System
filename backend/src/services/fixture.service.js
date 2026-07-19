import { getTournamentById } from "../repositories/tournament.repository.js";

import { getTournamentTeams } from "../repositories/tournament-team.repository.js";


import {
    createManyMatches,
    getMatchesByTournament,
    countMatchesByTournament
} from "../repositories/match.repository.js";
/*
|--------------------------------------------------------------------------
| Generate Round Robin Fixtures
|--------------------------------------------------------------------------
*/

export async function generateFixturesService(
    tournamentId,
    venue = "TBD"
) {

    // Check Tournament
    const tournament = await getTournamentById(tournamentId);

    if (!tournament) {
        throw new Error("Tournament not found.");
    }

    // Tournament must be UPCOMING
    if (tournament.status !== "UPCOMING") {
        throw new Error(
            "Fixtures can only be generated for upcoming tournaments."
        );
    }

    const existingMatches = await countMatchesByTournament(tournamentId);

    if (existingMatches > 0) {
      throw new Error(
        "Fixtures have already been generated for this tournament."
    );
    }




    // Get Registered Teams
    const registrations =
        await getTournamentTeams(tournamentId);

    if (registrations.length < 2) {
        throw new Error(
            "Minimum two teams are required."
        );
    }

    const fixtures = [];

    let matchDate = new Date(tournament.startDate);

    // Round Robin Algorithm
    for (let i = 0; i < registrations.length; i++) {

        for (let j = i + 1; j < registrations.length; j++) {

            fixtures.push({

                tournamentId,

                teamAId: registrations[i].teamId,

                teamBId: registrations[j].teamId,

                venue,

                matchDate: new Date(matchDate)

            });

            // Next day
            matchDate.setDate(
                matchDate.getDate() + 1
            );

        }

    }

    await createManyMatches(fixtures);

    const matches = await getMatchesByTournament(tournamentId);

    return matches.map((match, index) => ({

        matchNumber: index + 1,

        tournament: match.tournament.name,

        teamA: match.teamA.name,

        teamAShortName: match.teamA.shortName,

        teamB: match.teamB.name,

        teamBShortName: match.teamB.shortName,

        venue: match.venue,

        matchDate: match.matchDate,

        status: match.status

    }));
}