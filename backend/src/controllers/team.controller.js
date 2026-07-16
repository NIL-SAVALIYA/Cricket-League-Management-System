import {
    createTeamSchema,
    updateTeamSchema
} from "../validators/team.validator.js";

import {
    createTeamService,
    getAllTeamsService,
    getTeamByIdService,
    updateTeamService,
    deleteTeamService
} from "../services/team.service.js";

export async function create(req, res) {

    try {

        const data = createTeamSchema.parse(req.body);

        const team = await createTeamService(data);

        return res.status(201).json({
            success: true,
            message: "Team created successfully.",
            data: team
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

        const teams = await getAllTeamsService();

        return res.status(200).json({
            success: true,
            data: teams
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

        const team = await getTeamByIdService(req.params.id);

        return res.status(200).json({
            success: true,
            data: team
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

        const data = updateTeamSchema.parse(req.body);

        const team = await updateTeamService(req.params.id, data);

        return res.status(200).json({
            success: true,
            message: "Team updated successfully.",
            data: team
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

        await deleteTeamService(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Team deleted successfully."
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message
        });

    }

}