import {registerSchema} from "../validators/auth.validator.js";
import { registerUser } from "../services/auth.service.js";

export async function register(req,res) {


    try {

            const data = registerSchema.parse(req.body);

            const user = await registerUser(data);
            
            return res.status(201).json({

                success:true,
                message: "User registered successfully.",
                data: user

            });
    }

    catch(error) {

        return res.status(400).json({

                success: false,
                message: error.message

            });

    }
}