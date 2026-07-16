import {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam,
    findTeamByName,
    findTeamByShortName
} from "../repositories/team.repository.js";

export async function createTeamService(teamData) {

    const existingName = await findTeamByName(teamData.name);

    if (existingName) {
        throw new Error("Team name already exists.");
    }

    const existingShortName = await findTeamByShortName(teamData.shortName);

    if (existingShortName) {
        throw new Error("Team short name already exists.");
    }

    return await createTeam(teamData);
}

export async function getAllTeamsService() {
    return await getAllTeams();
}

export async function getTeamByIdService(id) {

    const team = await getTeamById(id);

    if (!team) {
        throw new Error("Team not found.");
    }

    return team;
}

export async function updateTeamService(id, teamData) {

    const team = await getTeamById(id);

    if (!team) {
        throw new Error("Team not found.");
    }

    if (teamData.name && teamData.name !== team.name) {

        const existingName = await findTeamByName(teamData.name);

        if (existingName) {
            throw new Error("Team name already exists.");
        }
    }

    if (teamData.shortName && teamData.shortName !== team.shortName) {

        const existingShortName = await findTeamByShortName(teamData.shortName);

        if (existingShortName) {
            throw new Error("Team short name already exists.");
        }
    }

    return await updateTeam(id, teamData);
}

export async function deleteTeamService(id) {

    const team = await getTeamById(id);

    if (!team) {
        throw new Error("Team not found.");
    }

    return await deleteTeam(id);
}