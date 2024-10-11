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
        return await db.primaryEmailMagicLinkToken.findFirst({
            where: {email}
        });
    } catch {
        return null;
    }

}
export const getSecondaryMagicVerificationTokenByEmail = async (
    email: string
) => {
    try {
        return await db.primaryEmailMagicLinkToken.findFirst({
            where: {email}
        });
    } catch {
        return null;
    }

}