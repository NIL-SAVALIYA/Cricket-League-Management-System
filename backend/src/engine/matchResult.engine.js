import {
    getInningsById,
    updateInnings,
    getInningsByMatch
} from "../repositories/innings.repository.js";

import {
    getMatchById,
    updateMatch
} from "../repositories/match.repository.js";

import {
    updatePointsTableService
} from "../services/pointsTable.service.js";

const MAX_WICKETS = 10;
const MAX_OVERS = 20;

export function isAllOut(innings) {
    return innings.wickets >= MAX_WICKETS;
}

export function isOversCompleted(innings) {
    return innings.legalBalls >= MAX_OVERS * 6;
}

export function isTargetChased(target, runs) {
    return target !== null && runs >= target;
}

export async function completeInnings(inningsId, db) {
    return await updateInnings(
        inningsId,
        {
            status: "COMPLETED"
        },
        db
    );
}

export async function completeMatch(
    matchId,
    winnerTeamId,
    result,
    winningMargin,
    db
) {
    return await updateMatch(
        matchId,
        {
            status: "COMPLETED",
            winnerTeamId,
            result,
            winningMargin,
            completedAt: new Date()
        },
        db
    );
}

function getWinningTeam(match, inningsList) {

    const firstInnings = inningsList.find(
        innings => innings.inningsNumber === 1
    );

    const secondInnings = inningsList.find(
        innings => innings.inningsNumber === 2
    );

    if (!firstInnings || !secondInnings) {
        return null;
    }

    if (secondInnings.totalRuns > firstInnings.totalRuns) {
        return {
            winnerTeamId: secondInnings.battingTeamId,
            result: "Won",
            winningMargin: `${10 - secondInnings.wickets} Wickets`
        };
    }

    if (firstInnings.totalRuns > secondInnings.totalRuns) {
        return {
            winnerTeamId: firstInnings.battingTeamId,
            result: "Won",
            winningMargin: `${firstInnings.totalRuns - secondInnings.totalRuns} Runs`
        };
    }

    return {
        winnerTeamId: null,
        result: "Tie",
        winningMargin: "Tie"
    };
}
export async function evaluateMatchResult(inningsId, db) {

    const innings = await getInningsById(inningsId, db);

    if (!innings) {
        throw new Error("Innings not found.");
    }

    const match = await getMatchById(
        innings.matchId,
        db
    );

    if (!match) {
        throw new Error("Match not found.");
    }

    const inningsList = await getInningsByMatch(
        innings.matchId,
        db
    );

    if (innings.inningsNumber === 1) {

        if (
            isAllOut(innings) ||
            isOversCompleted(innings)
        ) {

            await completeInnings(
                innings.id,
                db
            );

            return {
                completed: true,
                type: "INNINGS_COMPLETED"
            };
        }

        return {
            completed: false
        };
    }

    const firstInnings = inningsList.find(
        innings => innings.inningsNumber === 1
    );

    const secondInnings = inningsList.find(
        innings => innings.inningsNumber === 2
    );

    if (!firstInnings || !secondInnings) {
        throw new Error("Innings data not found.");
    }

    const target = firstInnings.totalRuns + 1;

    const targetChased = isTargetChased(
        target,
        innings.totalRuns
    );

    const inningsFinished =
        isAllOut(innings) ||
        isOversCompleted(innings);

    if (!targetChased && !inningsFinished) {

        return {
            completed: false
        };
    }

    await completeInnings(
        innings.id,
        db
    );

    const result = getWinningTeam(
        match,
        inningsList
    );

    await completeMatch(
        match.id,
        result.winnerTeamId,
        result.result,
        result.winningMargin,
        db
    );

    const loserTeamId =
        result.winnerTeamId === match.teamAId
            ? match.teamBId
            : match.teamAId;

    await updatePointsTableService(
        match.tournamentId,
        result.winnerTeamId,
        {
            won: true,
            lost: false,
            tied: false,
            noResult: false,

            runsScored:
                result.winnerTeamId === firstInnings.battingTeamId
                    ? firstInnings.totalRuns
                    : secondInnings.totalRuns,

            ballsFaced:
                result.winnerTeamId === firstInnings.battingTeamId
                    ? firstInnings.legalBalls
                    : secondInnings.legalBalls,

            runsConceded:
                result.winnerTeamId === firstInnings.battingTeamId
                    ? secondInnings.totalRuns
                    : firstInnings.totalRuns,

            ballsBowled:
                result.winnerTeamId === firstInnings.battingTeamId
                    ? secondInnings.legalBalls
                    : firstInnings.legalBalls
        },
        db
    );

    await updatePointsTableService(
        match.tournamentId,
        loserTeamId,
        {
            won: false,
            lost: true,
            tied: false,
            noResult: false,

            runsScored:
                loserTeamId === firstInnings.battingTeamId
                    ? firstInnings.totalRuns
                    : secondInnings.totalRuns,

            ballsFaced:
                loserTeamId === firstInnings.battingTeamId
                    ? firstInnings.legalBalls
                    : secondInnings.legalBalls,

            runsConceded:
                loserTeamId === firstInnings.battingTeamId
                    ? secondInnings.totalRuns
                    : firstInnings.totalRuns,

            ballsBowled:
                loserTeamId === firstInnings.battingTeamId
                    ? secondInnings.legalBalls
                    : firstInnings.legalBalls
        },
        db
    );

    return {
        completed: true,
        type: "MATCH_COMPLETED",
        winnerTeamId: result.winnerTeamId,
        result: result.result,
        winningMargin: result.winningMargin
    };
}