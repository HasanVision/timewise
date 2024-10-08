import {db} from "../database.js";

export const getMagicVerificationTokenByToken = async (
    token: string
) => {
    try {
        return await db.verificationToken.findUnique({
            where: {token}
        });
    } catch {
        return null;
    }

}



export const getMagicVerificationTokenByEmail = async (
    email: string
) => {
    try {
        return await db.magicLinkToken.findFirst({
            where: {email}
        });
    } catch {
        return null;
    }

}