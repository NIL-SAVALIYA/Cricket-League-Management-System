import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    const roles = [

            {

                name:"ADMIN",
                description:"system administrator"
            },
            {

                name:"ORGANIZER",
                description:"Tournament Organizer"

            },

            {
                name:"TEAM_MANAGER",
                description:"Team Manager"

            },

            {
                name:"VIEWER",
                description:"Read only users"
            }
    ];

    for (const role of roles) {

        await prisma.role.upsert({

                where: {
                    name:role.name
                },

                update: {},

                create: role

        });


    }
    console.log("✅ Default roles seeded successfully.");

}


main() 
    .catch((error) => {

            console.error(error);
            process.exit(1);

    })
    .finally(async () =>  {


        await prisma.$disconnect();
    });
