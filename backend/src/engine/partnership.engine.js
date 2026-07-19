/*
|--------------------------------------------------------------------------
| partnership.engine.js
|--------------------------------------------------------------------------
|
| Handles:
| - Partnership Runs
| - Partnership Balls
| - Partnership Boundaries
| - Partnership Status
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Partnership Runs
|--------------------------------------------------------------------------
*/

export function calculatePartnershipRuns({

    currentRuns,

    ballRuns

}) {

    return currentRuns + ballRuns;

}

/*
|--------------------------------------------------------------------------
| Partnership Balls
|--------------------------------------------------------------------------
*/

export function calculatePartnershipBalls({

    currentBalls,

    isLegalDelivery

}) {

    return isLegalDelivery

        ? currentBalls + 1

        : currentBalls;

}

/*
|--------------------------------------------------------------------------
| Partnership Fours
|--------------------------------------------------------------------------
*/

export function calculatePartnershipFours({

    currentFours,

    batRuns

}) {

    return batRuns === 4

        ? currentFours + 1

        : currentFours;

}

/*
|--------------------------------------------------------------------------
| Partnership Sixes
|--------------------------------------------------------------------------
*/

export function calculatePartnershipSixes({

    currentSixes,

    batRuns

}) {

    return batRuns === 6

        ? currentSixes + 1

        : currentSixes;

}

/*
|--------------------------------------------------------------------------
| Partnership Run Rate
|--------------------------------------------------------------------------
*/

export function calculatePartnershipRunRate({

    runs,

    legalBalls

}) {

    if (legalBalls === 0) {

        return 0;

    }

    return Number(

        (

            runs /

            (legalBalls / 6)

        ).toFixed(2)

    );

}

/*
|--------------------------------------------------------------------------
| Partnership Broken?
|--------------------------------------------------------------------------
*/

export function isPartnershipBroken(

    isWicket

) {

    return isWicket;

}

/*
|--------------------------------------------------------------------------
| Partnership Summary
|--------------------------------------------------------------------------
*/

export function buildPartnershipSummary({

    runs,

    legalBalls,

    fours,

    sixes,

    active

}) {

    return {

        runs,

        balls: legalBalls,

        overs: `${Math.floor(legalBalls / 6)}.${legalBalls % 6}`,

        fours,

        sixes,

        runRate:

            calculatePartnershipRunRate({

                runs,

                legalBalls

            }),

        active

    };

}