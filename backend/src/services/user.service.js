import {
    getAllUsers,
    findUserById,
    updateUser,
    deleteUser
} from "../repositories/user.repository.js";

export async function fetchUsers() {
    return await getAllUsers();
}

export async function fetchUser(id) {

    const user = await findUserById(id);

    if (!user) {
        throw new Error("User not found.");
    }

    return user;
}

export async function editUser(id, data) {

    await fetchUser(id);

    return await updateUser(id, data);
}

export async function removeUser(id) {

    await fetchUser(id);

    return await deleteUser(id);
}