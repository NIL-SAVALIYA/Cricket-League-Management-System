import { generateFixturesService } from "../services/fixture.service.js";

/*
|--------------------------------------------------------------------------
| Generate Fixtures
|--------------------------------------------------------------------------
*/

export async function generateFixtures(req, res) {

    try {

        const { tournamentId } = req.params;

        const { venue } = req.body;

        const fixtures = await generateFixturesService(
            tournamentId,
            venue
        );

        return res.status(201).json({

            success: true,

            message: "Fixtures generated successfully.",

            totalMatches: fixtures.length,

            data: fixtures

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

}