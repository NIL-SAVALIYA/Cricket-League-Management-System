import {registerSchema, loginSchema} from "../validators/auth.validator.js";
import { registerUser, LoginUser, getProfile} from "../services/auth.service.js";

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


//new added for Login user in import loginSchema and LoginUser added...

export async function login(req,res) {

    try {


        const data = loginSchema.parse(req.body);

        const result = await LoginUSer(data);

        return res.status(200).json( {

                success: true,
                message: "Login Successful.",
                data: result


        });


    }   catch(error) {

        return res.status(401).json({

                success: false,
                message: error.message


        });


    }
}


// new import added in auth.service.js like getProfile and new function:

export async function profile(req, res) {

    try {

        const user = await getProfile(req.user.userId);

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
