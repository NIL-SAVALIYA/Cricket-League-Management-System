import prisma from "../config/prisma.js";

/*
|--------------------------------------------------------------------------
| Create Ball
|--------------------------------------------------------------------------
*/

export async function createBall(data) {

    return await prisma.ball.create({

        data,

        include: {

            batsman: true,

            nonStriker: true,

            bowler: true,

            innings: true

        }

    });

}

/*
|--------------------------------------------------------------------------
| Get All Balls
|--------------------------------------------------------------------------
*/

export async function getAllBalls() {

    return await prisma.ball.findMany({

        orderBy: [

            {
                deliveryNumber: "asc"
            }

        ],

        include: {

            batsman: true,

            nonStriker: true,

            bowler: true,

            dismissedPlayer: true,

            fielder: true

        }

    });

}

/*
|--------------------------------------------------------------------------
| Get Ball By ID
|--------------------------------------------------------------------------
*/

export async function getBallById(id) {

    return await prisma.ball.findUnique({

        where: {

            id

        },

        include: {

            batsman: true,

            nonStriker: true,

            bowler: true,

            innings: true,

            dismissedPlayer: true,

            fielder: true

        }

    });

}

/*
|--------------------------------------------------------------------------
| Get Balls By Innings
|--------------------------------------------------------------------------
*/

export async function getBallsByInnings(inningsId) {

    return await prisma.ball.findMany({

        where: {

            inningsId

        },

        orderBy: [

            {
                deliveryNumber: "asc"
            }

        ],

        include: {

            batsman: true,

            nonStriker: true,

            bowler: true,

            dismissedPlayer: true,

            fielder: true

        }

    });

}

/*
|--------------------------------------------------------------------------
| Get Last Ball
|--------------------------------------------------------------------------
*/

export async function getLastBall(inningsId) {

    return await prisma.ball.findFirst({

        where: {

            inningsId

        },

        orderBy: {

            deliveryNumber: "desc"

        }

    });

}

/*
|--------------------------------------------------------------------------
| Update Ball
|--------------------------------------------------------------------------
*/

export async function updateBall(id, data) {

    return await prisma.ball.update({

        where: {

            id

        },

        data,

        include: {

            batsman: true,

            nonStriker: true,

            bowler: true

        }

    });

}

/*
|--------------------------------------------------------------------------
| Delete Ball
|--------------------------------------------------------------------------
*/

export async function deleteBall(id) {

    return await prisma.ball.delete({

        where: {

            id

        }

    });

}

/*
|--------------------------------------------------------------------------
| Count Legal Deliveries
|--------------------------------------------------------------------------
*/

export async function countLegalDeliveries(inningsId) {

    return await prisma.ball.count({

        where: {

            inningsId,

            isLegalDelivery: true

        }

    });

}

/*
|--------------------------------------------------------------------------
| Count Total Deliveries
|--------------------------------------------------------------------------
*/

export async function countDeliveries(inningsId) {

    return await prisma.ball.count({

        where: {

            inningsId

        }

    });

}