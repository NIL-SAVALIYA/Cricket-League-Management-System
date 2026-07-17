import {
    createMatchSchema,
    updateMatchSchema
} from "../validators/match.validator.js";

import {
    createMatchService,
    getAllMatchesService,
    getMatchByIdService,
    updateMatchService,
    deleteMatchService
} from "../services/match.service.js";

/*
|--------------------------------------------------------------------------
| Create Match
|--------------------------------------------------------------------------
*/

export async function create(req, res) {

    try {

        const data = createMatchSchema.parse(req.body);

        const match = await createMatchService(data);

        return res.status(201).json({
            success: true,
            message: "Match created successfully.",
            data: match
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
| Get All Matches
|--------------------------------------------------------------------------
*/

export async function getAll(req, res) {

    try {

        const matches = await getAllMatchesService();

        return res.status(200).json({
            success: true,
            data: matches
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
| Get Match By ID
|--------------------------------------------------------------------------
*/

export async function getOne(req, res) {

    try {

        const match = await getMatchByIdService(req.params.id);

        return res.status(200).json({
            success: true,
            data: match
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
| Update Match
|--------------------------------------------------------------------------
*/

export async function update(req, res) {

    try {

        const data = updateMatchSchema.parse(req.body);

        const match = await updateMatchService(
            req.params.id,
            data
        );

        return res.status(200).json({
            success: true,
            message: "Match updated successfully.",
            data: match
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
| Delete Match
|--------------------------------------------------------------------------
*/

export async function remove(req, res) {

    try {

        await deleteMatchService(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Match deleted successfully."
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message
        });

    }

}