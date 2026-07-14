import prisma from "../config/db.js";

export async function  findUserByEmail(email) {

         return prisma.user.findUnique({

                where: {

                    email
                }

         });
         
}

export async function  findRoleByName(name) {

         return prisma.role.findUnique({

                where: {

                        name
                }

         });
         
}


export async function createUser(data) {

    return prisma.user.create({
        data    
    });

}