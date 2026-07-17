import {
    createPlayerSchema,
    updatePlayerSchema
} from "../validators/player.validator.js";

import {
    createPlayerService,
    getAllPlayersService,
    getPlayerByIdService,
    updatePlayerService,
    deletePlayerService
} from "../services/player.service.js";

export async function create(req, res) {

    try {

        const data = createPlayerSchema.parse(req.body);

        const player = await createPlayerService(data);

        return res.status(201).json({
            success: true,
            message: "Player created successfully.",
            data: player
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

}

export async function getAll(req, res) {

    try {

        const players = await getAllPlayersService();

        return res.status(200).json({
            success: true,
            data: players
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

export async function getOne(req, res) {

    try {

        const player = await getPlayerByIdService(req.params.id);

        return res.status(200).json({
            success: true,
            data: player
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message
        });

    }

}

export async function update(req, res) {

    try {

        const data = updatePlayerSchema.parse(req.body);

        const player = await updatePlayerService(req.params.id, data);

        return res.status(200).json({
            success: true,
            message: "Player updated successfully.",
            data: player
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

}

export async function remove(req, res) {

    try {

        await deletePlayerService(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Player deleted successfully."
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message
        });

    }

}