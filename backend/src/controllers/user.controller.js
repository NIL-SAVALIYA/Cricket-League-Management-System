import {
    fetchUsers,
    fetchUser,
    editUser,
    removeUser
} from "../services/user.service.js";

export async function getAll(req, res) {

    try {

        const users = await fetchUsers();

        return res.status(200).json({

            success: true,
            data: users

        });

    } catch (error) {

        return res.status(400).json({

            success: false,
            message: error.message

        });

    }

}

export async function getOne(req, res) {

    try {

        const user = await fetchUser(req.params.id);

        return res.status(200).json({

            success: true,
            data: user

        });

    } catch (error) {

        return res.status(404).json({

            success: false,
            message: error.message

        });

    }

}

export async function update(req, res) {

    try {

        const user = await editUser(req.params.id, req.body);

        return res.status(200).json({

            success: true,
            message: "User updated successfully.",
            data: user

        });

    } catch (error) {

        return res.status(400).json({

            success: false,
            message: error.message

        });

    }

}

export async function remove(req, res) {

    try {

        await removeUser(req.params.id);

        return res.status(200).json({

            success: true,
            message: "User deleted successfully."

        });

    } catch (error) {

        return res.status(400).json({

            success: false,
            message: error.message

        });

    }

}