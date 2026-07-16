import prisma from "../config/db.js";

export async function findUserByEmail(email) {

    return prisma.user.findUnique({

        where: {
            email
        },

        include: {
            role: true
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

//new function added for first profile API 

export async function findUserById(id) {

    return prisma.user.findUnique({

        where: {
            id
        },

        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            profileImageUrl: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            role: {
                select: {
                    id: true,
                    name: true,
                    description: true
                }
            }
        }

    });

}
//new section for role Management CRUD 

export async function getAllUsers() {
    return prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            profileImageUrl: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            role: {
                select: {
                    id: true,
                    name: true,
                    description: true
                }
            }
        },
        orderBy: {
            createdAt: "asc"
        }
    });
}

export async function updateUser(id, data) {
    return prisma.user.update({
        where: {
            id
        },
        data
    });
}

export async function deleteUser(id) {
    return prisma.user.delete({
        where: {
            id
        }
    });
}