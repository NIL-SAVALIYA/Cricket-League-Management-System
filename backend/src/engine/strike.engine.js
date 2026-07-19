/*
|--------------------------------------------------------------------------
| strike.engine.js
|--------------------------------------------------------------------------
|
| Handles:
| - Strike Rotation
| - End of Over Strike Change
| - Batsman Swapping
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Should Rotate Strike?
|--------------------------------------------------------------------------
|
| Strike changes when the total completed runs are odd.
|--------------------------------------------------------------------------
*/

export function shouldRotateStrike(totalRuns) {

    return totalRuns % 2 === 1;

}

/*
|--------------------------------------------------------------------------
| Swap Batsmen
|--------------------------------------------------------------------------
*/

export function swapStrike({

    strikerId,

    nonStrikerId

}) {

    return {

        strikerId: nonStrikerId,

        nonStrikerId: strikerId

    };

}

/*
|--------------------------------------------------------------------------
| Rotate Strike After Delivery
|--------------------------------------------------------------------------
*/

export function rotateStrike({

    strikerId,

    nonStrikerId,

    totalRuns

}) {

    if (!shouldRotateStrike(totalRuns)) {

        return {

            strikerId,

            nonStrikerId

        };

    }

    return swapStrike({

        strikerId,

        nonStrikerId

    });

}

/*
|--------------------------------------------------------------------------
| End Of Over Rotation
|--------------------------------------------------------------------------
|
| At the end of every completed over,
| the strike automatically changes.
|--------------------------------------------------------------------------
*/

export function rotateAtOverEnd({

    strikerId,

    nonStrikerId

}) {

    return swapStrike({

        strikerId,

        nonStrikerId

    });

}

/*
|--------------------------------------------------------------------------
| Final Strike Decision
|--------------------------------------------------------------------------
|
| Applies:
| 1. Rotation due to runs
| 2. Rotation at end of over
|--------------------------------------------------------------------------
*/

export function getNextStrike({

    strikerId,

    nonStrikerId,

    totalRuns,

    overCompleted

}) {

    let players = rotateStrike({

        strikerId,

        nonStrikerId,

        totalRuns

    });

    if (overCompleted) {

        players = rotateAtOverEnd({

            strikerId: players.strikerId,

            nonStrikerId: players.nonStrikerId

        });

    }

    return players;

}

/*
|--------------------------------------------------------------------------
| Validate Players
|--------------------------------------------------------------------------
*/

export function validateStrike({

    strikerId,

    nonStrikerId

}) {

    if (!strikerId) {

        throw new Error(
            "Striker is required."
        );

    }

    if (!nonStrikerId) {

        throw new Error(
            "Non-striker is required."
        );

    }

    if (strikerId === nonStrikerId) {

        throw new Error(
            "Striker and non-striker cannot be the same player."
        );

    }

}

/*
|--------------------------------------------------------------------------
| Build Strike Summary
|--------------------------------------------------------------------------
*/

export function buildStrikeSummary({

    strikerId,

    nonStrikerId,

    totalRuns,

    overCompleted

}) {

    validateStrike({

        strikerId,

        nonStrikerId

    });

    const players = getNextStrike({

        strikerId,

        nonStrikerId,

        totalRuns,

        overCompleted

    });

    return {

        strikerId: players.strikerId,

        nonStrikerId: players.nonStrikerId,

        strikeRotated:
            shouldRotateStrike(totalRuns),

        overCompleted

    };

}