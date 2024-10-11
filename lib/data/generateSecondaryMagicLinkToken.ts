import * as crypto from "crypto";
import { getSecondaryMagicVerificationTokenByEmail } from "./getMagicVerificationTokenByEmail.js";
import { db } from "../database.js";

const token = crypto.randomUUID();
const expires = new Date(new Date().getTime() + 3600 * 1000); // Token expires in 1 hour

export const generateSecondaryMagicVerificationToken = async (email: string) => {
  try {
 
    const existingToken = await getSecondaryMagicVerificationTokenByEmail(email);

    if (existingToken) {
      // Delete the existing token
      await db.secondaryEmailMagicLinkToken.deleteMany({
        where: {
          id: existingToken.id,
        },
      });
      // console.log(`Existing verification token for ${email} deleted.`);
    }

    // Create and store the new verification token in the database
    const newToken = await db.secondaryEmailMagicLinkToken.create({
      data: {
        email: email,
        token: token,
        expires,
      },
    });

    // console.log(`New verification token generated for ${email}: ${token}`);
    return newToken;
  } catch (error) {
    console.error('Error generating secondary magic verification token:', error);
    throw new Error('Could not generate secondary magic verification token. Please try again later.');
  }
};

// TODO: REDUCE VERIFICATION TOKEN EXPIRATION TIME TO 5 MINUTES