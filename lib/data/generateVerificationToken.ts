import * as crypto from "crypto";
import { getVerificationTokenByEmail } from "./getVerificationTokenByEmail.js";
import { db } from "../database.js";

export const generateVerificationToken = async (email: string) => {
  try {
    // Generate a unique token and set expiration (1 hour from now)
    const token = crypto.randomUUID();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    // Check if there is an existing token for this email
    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
      // Delete the existing token
      await db.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
      console.log(`Existing verification token for ${email} deleted.`);
    }

    // Create and store the new verification token in the database
    const newToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    console.log(`New verification token generated for ${email}: ${token}`);
    return newToken;
  } catch (error) {
    console.error('Error generating verification token:', error);
    throw new Error('Could not generate verification token. Please try again later.');
  }
};