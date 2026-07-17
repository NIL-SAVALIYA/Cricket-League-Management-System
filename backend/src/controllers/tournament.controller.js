import {
    createTournamentSchema,
    updateTournamentSchema
} from "../validators/tournament.validator.js";

import {
    createTournamentService,
    getAllTournamentsService,
    getTournamentByIdService,
    updateTournamentService,
    deleteTournamentService
} from "../services/tournament.service.js";

/*
|--------------------------------------------------------------------------
| Create Tournament
|--------------------------------------------------------------------------
*/

export async function create(req, res) {

    try {

        const data = createTournamentSchema.parse(req.body);

        const tournament = await createTournamentService(data);

        return res.status(201).json({
            success: true,
            message: "Tournament created successfully.",
            data: tournament
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

}

/*
|--------------------------------------------------------------------------
| Get All Tournaments
|--------------------------------------------------------------------------
*/

export async function getAll(req, res) {

    try {

        const tournaments = await getAllTournamentsService();

        return res.status(200).json({
            success: true,
            data: tournaments
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

/*
|--------------------------------------------------------------------------
| Get Tournament By ID
|--------------------------------------------------------------------------
*/

export async function getOne(req, res) {

    try {

        const tournament = await getTournamentByIdService(req.params.id);

        return res.status(200).json({
            success: true,
            data: tournament
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message
        });

    }

}

/*
|--------------------------------------------------------------------------
| Update Tournament
|--------------------------------------------------------------------------
*/

export async function update(req, res) {

    try {

        const data = updateTournamentSchema.parse(req.body);

        const tournament = await updateTournamentService(
            req.params.id,
            data
        );

        return res.status(200).json({
            success: true,
            message: "Tournament updated successfully.",
            data: tournament
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

}

/*
|--------------------------------------------------------------------------
| Delete Tournament
|--------------------------------------------------------------------------
*/

export async function remove(req, res) {

    try {

        await deleteTournamentService(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Tournament deleted successfully."
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message
        });

    }

}