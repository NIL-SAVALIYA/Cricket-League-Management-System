import {
    createRole,
    findRoleByName,
    getAllRoles,
    findRoleById,
    updateRole,
    deleteRole
} from "../repositories/role.repository.js";

export async function addRole(data) {

    const roleExists = await findRoleByName(data.name);

    if (roleExists) {
        throw new Error("Role already exists.");
    }

    return await createRole(data);
}

export async function fetchRoles() {

    return await getAllRoles();

}

export async function fetchRole(id) {

    const role = await findRoleById(id);

    if (!role) {
        throw new Error("Role not found.");
    }

    return role;
}

export async function editRole(id, data) {

    await fetchRole(id);

    return await updateRole(id, data);
}

export async function removeRole(id) {

    await fetchRole(id);

    return await deleteRole(id);
}