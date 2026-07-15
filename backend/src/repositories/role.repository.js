import prisma from "../config/db.js";

export async function createRole(data) {
    return prisma.role.create({
        data
    });
}

export async function findRoleByName(name) {
    return prisma.role.findUnique({
        where: {
            name
        }
    });
}

export async function getAllRoles() {
    return prisma.role.findMany({
        orderBy: {
            createdAt: "asc"
        }
    });
}

export async function findRoleById(id) {
    return prisma.role.findUnique({
        where: {
            id
        }
    });
}

export async function updateRole(id, data) {
    return prisma.role.update({
        where: {
            id
        },
        data
    });
}

export async function deleteRole(id) {
    return prisma.role.delete({
        where: {
            id
        }
    });
}