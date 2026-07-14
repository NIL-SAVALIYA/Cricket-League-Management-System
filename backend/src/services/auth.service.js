import bcrypt from "bcrypt";

import {

    findUserByEmail,
    findRoleByName,
    createUser

}  from "../repositories/user.repository.js";
import { create } from "node:domain";


export async function registerUser(userData) {

            const {

                firstName,
                lastName,
                email,
                password,
                role

            }=userData;
        

            const existingUser= await findUserByEmail(email);


            if(existingUser) {
                throw new Error("Email already registered.");
            }

            const roleData = await findRoleByName(role);

            if(!roleData) {
                throw new Error("Invalid role.");
            }

            const hasedPassword = await bcrypt.hash(password,10);


            const user= await createUser({

                    firstName,
                    lastName,
                    email,
                    password: hasedPassword,
                    roleId: roleData.id

            });


            return {

                 id:user.id,
                 firstName: user.firstName,
                 lastName: user.lastName,
                 email: user.email,
                 role: roleData.name



            };


}