import {
    createPlayer,
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer
} from "../repositories/player.repository.js";

export async function createPlayerService(playerData) {
    return await createPlayer(playerData);
}

export async function getAllPlayersService() {
    return await getAllPlayers();
}

export async function getPlayerByIdService(id) {

    const player = await getPlayerById(id);

    if (!player) {
        throw new Error("Player not found.");
    }

    return player;
}

export async function updatePlayerService(id, playerData) {

    const player = await getPlayerById(id);

    if (!player) {
        throw new Error("Player not found.");
    }

    return await updatePlayer(id, playerData);
}

export async function deletePlayerService(id) {

    const player = await getPlayerById(id);

    if (!player) {
        throw new Error("Player not found.");
    }

    return await deletePlayer(id);
}