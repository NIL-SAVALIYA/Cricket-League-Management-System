import { getPlayersByTeam } from "../repositories/player.repository.js";

import {
    createManyBattingScorecards,
    getBattingScorecardsByInnings
} from "../repositories/battingScorecard.repository.js";

import {
    createManyBowlingScorecards,
    getBowlingScorecardsByInnings
} from "../repositories/bowlingScorecard.repository.js";

export async function initializeScorecards(innings) {

    console.log("Inside initializeScorecards");

    const battingExists =
        await getBattingScorecardsByInnings(
            innings.id,
            
        );

    const bowlingExists =
        await getBowlingScorecardsByInnings(
            innings.id,
            
        );

    if (
        battingExists.length > 0 ||
        bowlingExists.length > 0
    ) {
        return;
    }

    const battingPlayers =
        await getPlayersByTeam(
            innings.battingTeamId,
            
        );

    const bowlingPlayers =
        await getPlayersByTeam(
            innings.bowlingTeamId,
            
        );

    await createManyBattingScorecards(

        battingPlayers.map((player, index) => ({

            inningsId: innings.id,

            playerId: player.id,

            battingPosition: index + 1

        })),

        

    );

    await createManyBowlingScorecards(

        bowlingPlayers.map(player => ({

            inningsId: innings.id,

            bowlerId: player.id

        })),

        

    );

}