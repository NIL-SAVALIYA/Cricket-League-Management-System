import {
    createInnings,
    getAllInnings,
    getInningsById,
    updateInnings,
    deleteInnings,
    getInningsByMatch
} from "../repositories/innings.repository.js";

import {
    getMatchById
} from "../repositories/match.repository.js";

import {
    getTeamById
} from "../repositories/team.repository.js";

import { initializeScorecards } from "./scorecardInitialization.service.js";

/*
|--------------------------------------------------------------------------
| Create Innings
|--------------------------------------------------------------------------
*/

export async function createInningsService(inningsData) {

    // Check Match Exists
    const match = await getMatchById(inningsData.matchId);

    if (!match) {
        throw new Error("Match not found.");
    }

    // Check Batting Team Exists
    const battingTeam = await getTeamById(
        inningsData.battingTeamId
    );

    if (!battingTeam) {
        throw new Error("Batting team not found.");
    }

    // Check Bowling Team Exists
    const bowlingTeam = await getTeamById(
        inningsData.bowlingTeamId
    );

    if (!bowlingTeam) {
        throw new Error("Bowling team not found.");
    }

    // Teams cannot be the same
    if (
        inningsData.battingTeamId ===
        inningsData.bowlingTeamId
    ) {
        throw new Error(
            "Batting and Bowling teams cannot be the same."
        );
    }

    // Teams must belong to the match
    const validTeams = [
        match.teamAId,
        match.teamBId
    ];

    if (
        !validTeams.includes(inningsData.battingTeamId) ||
        !validTeams.includes(inningsData.bowlingTeamId)
    ) {
        throw new Error(
            "Teams do not belong to this match."
        );
    }

    // Maximum 2 Innings
    const existingInnings =
        await getInningsByMatch(inningsData.matchId);

    if (existingInnings.length >= 2) {
        throw new Error(
            "Only two innings are allowed per match."
        );
    }

    // Duplicate Innings Number
    const alreadyExists = existingInnings.find(

        innings =>
            innings.inningsNumber ===
            inningsData.inningsNumber

    );

    if (alreadyExists) {
        throw new Error(
            `Innings ${inningsData.inningsNumber} already exists.`
        );
    }

    const innings = await createInnings(inningsData);

    console.log("✅ Innings Created:", innings.id);

    await initializeScorecards(innings);

    console.log("✅ Scorecards Initialized");

    return innings;
}

/*
|--------------------------------------------------------------------------
| Get All Innings
|--------------------------------------------------------------------------
*/

export async function getAllInningsService() {

    return await getAllInnings();

}

/*
|--------------------------------------------------------------------------
| Get Innings By ID
|--------------------------------------------------------------------------
*/

export async function getInningsByIdService(id) {

    const innings = await getInningsById(id);

    if (!innings) {
        throw new Error("Innings not found.");
    }

    return innings;

}

/*
|--------------------------------------------------------------------------
| Update Innings
|--------------------------------------------------------------------------
*/

export async function updateInningsService(id, data) {

    const innings = await getInningsById(id);

    if (!innings) {
        throw new Error("Innings not found.");
    }

    return await updateInnings(id, data);

}

/*
|--------------------------------------------------------------------------
| Delete Innings
|--------------------------------------------------------------------------
*/

export async function deleteInningsService(id) {

    const innings = await getInningsById(id);

    if (!innings) {
        throw new Error("Innings not found.");
    }

    return await deleteInnings(id);

}