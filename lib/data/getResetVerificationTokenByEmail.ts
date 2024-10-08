import {db} from "../database.js";

// export const getVerificationTokenByToken = async (
//     token: string
// ) => {
//     try {
//         return await db.verificationToken.findUnique({
//             where: {token}
//         });
//     } catch {
//         return null;
//     }

// }



export const getResetVerificationTokenByEmail = async (
    email: string
) => {
    try {
        return await db.resetPasswordToken.findFirst({
            where: {email}
        });
    } catch {
        return null;
    }

}