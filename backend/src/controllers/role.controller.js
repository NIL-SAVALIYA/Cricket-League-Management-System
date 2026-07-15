import { roleSchema } from "../validators/role.validator.js";
import { addRole, fetchRoles, fetchRole, editRole ,removeRole} from "../services/role.service.js";


export async function create(req, res) {

    try {

        const data = roleSchema.parse(req.body);

        const role = await addRole(data);

        return res.status(201).json({

            success: true,
            message: "Role created successfully.",

            data: role

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

}

export async function getAll(req, res) {

    try {

        const roles = await fetchRoles();

        return res.status(200).json({

            success: true,

            data: roles

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

}


// getone,update and remove 

export async function getOne(req, res) {
    try {

        const role = await fetchRole(req.params.id);

        return res.status(200).json({
            success: true,
            data: role
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

        const data = roleSchema.parse(req.body);

        const role = await editRole(req.params.id, data);

        return res.status(200).json({
            success: true,
            message: "Role updated successfully.",
            data: role
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

        await removeRole(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Role deleted successfully."
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message
        });

    }
}



