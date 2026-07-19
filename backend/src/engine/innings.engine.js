/*
|--------------------------------------------------------------------------
| innings.engine.js
|--------------------------------------------------------------------------
|
| Handles:
| - Innings Total Runs
| - Wickets
| - Legal Balls
| - Overs
| - Run Rate
| - Target Remaining
| - Required Run Rate
|--------------------------------------------------------------------------
*/

import { formatOvers } from "./over.engine.js";

/*
|--------------------------------------------------------------------------
| Total Runs
|--------------------------------------------------------------------------
*/

export function calculateInningsRuns({

    currentRuns,

    ballRuns

}) {

    return currentRuns + ballRuns;

}

/*
|--------------------------------------------------------------------------
| Total Wickets
|--------------------------------------------------------------------------
*/

export function calculateWickets({

    currentWickets,

    isWicket

}) {

    return isWicket
        ? currentWickets + 1
        : currentWickets;

}

/*
|--------------------------------------------------------------------------
| Legal Balls
|--------------------------------------------------------------------------
*/

export function calculateLegalBalls({

    currentLegalBalls,

    isLegalDelivery

}) {

    return isLegalDelivery
        ? currentLegalBalls + 1
        : currentLegalBalls;

}

/*
|--------------------------------------------------------------------------
| Total Deliveries
|--------------------------------------------------------------------------
*/

export function calculateDeliveries({

    currentDeliveries

}) {

    return currentDeliveries + 1;

}

/*
|--------------------------------------------------------------------------
| Current Run Rate
|--------------------------------------------------------------------------
*/

export function calculateRunRate({

    runs,

    legalBalls

}) {

    if (legalBalls === 0) {

        return 0;

    }

    const overs = legalBalls / 6;

    return Number(
        (runs / overs).toFixed(2)
    );

}

/*
|--------------------------------------------------------------------------
| Remaining Runs
|--------------------------------------------------------------------------
*/

export function remainingRuns({

    target,

    currentRuns

}) {

    return Math.max(

        target - currentRuns,

        0

    );

}

/*
|--------------------------------------------------------------------------
| Remaining Balls
|--------------------------------------------------------------------------
*/

export function remainingBalls({

    maxOvers,

    legalBalls

}) {

    return Math.max(

        (maxOvers * 6) - legalBalls,

        0

    );

}

/*
|--------------------------------------------------------------------------
| Required Run Rate
|--------------------------------------------------------------------------
*/

export function requiredRunRate({

    target,

    currentRuns,

    maxOvers,

    legalBalls

}) {

    const runsLeft = remainingRuns({

        target,

        currentRuns

    });

    const ballsLeft = remainingBalls({

        maxOvers,

        legalBalls

    });

    if (ballsLeft === 0) {

        return 0;

    }

    const oversLeft = ballsLeft / 6;

    return Number(

        (runsLeft / oversLeft)

        .toFixed(2)

    );

}

/*
|--------------------------------------------------------------------------
| Innings Completed?
|--------------------------------------------------------------------------
*/

export function isInningsCompleted({

    wickets,

    totalPlayers,

    legalBalls,

    maxOvers

}) {

    if (

        wickets >= totalPlayers - 1

    ) {

        return true;

    }

    return legalBalls >= maxOvers * 6;

}

/*
|--------------------------------------------------------------------------
| Build Innings Summary
|--------------------------------------------------------------------------
*/

export function buildInningsSummary({

    runs,

    wickets,

    legalBalls,

    deliveries,

    target = null,

    maxOvers,

    totalPlayers = 11

}) {

    return {

        runs,

        wickets,

        legalBalls,

        deliveries,

        overs:

            formatOvers(

                legalBalls

            ),

        runRate:

            calculateRunRate({

                runs,

                legalBalls

            }),

        requiredRunRate:

            target === null

                ? null

                : requiredRunRate({

                    target,

                    currentRuns: runs,

                    maxOvers,

                    legalBalls

                }),

        inningsCompleted:

            isInningsCompleted({

                wickets,

                totalPlayers,

                legalBalls,

                maxOvers

            })

    };

}