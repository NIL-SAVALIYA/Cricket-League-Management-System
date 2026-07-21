import {
    initializePointsTableService,
    getPointsTableService
} from "../services/pointsTable.service.js";

export async function initializePointsTable(req, res, next) {
    try {
        const { tournamentId } = req.params;

        const pointsTable =
            await initializePointsTableService(
                tournamentId
            );

        return res.status(201).json({
            success: true,
            message: "Points table initialized successfully.",
            data: pointsTable
        });

    } catch (error) {
        next(error);
    }
}

export async function getPointsTable(req, res, next) {
    try {
        const { tournamentId } = req.params;

        const standings =
            await getPointsTableService(
                tournamentId
            );

        return res.status(200).json({
            success: true,
            message: "Points table fetched successfully.",
            data: standings
        });

    } catch (error) {
        next(error);
    }
}