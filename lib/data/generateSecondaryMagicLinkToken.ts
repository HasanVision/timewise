import * as crypto from "crypto";
import { getSecondaryMagicVerificationTokenByEmail } from "./getMagicVerificationTokenByEmail.js";
import { db } from "../database.js";

export const generateSecondaryMagicVerificationToken = async (email: string) => {
  try {
    const token = crypto.randomUUID();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // Token expires in 1 hour

    const existingToken = await db.secondaryEmailMagicLinkToken.findFirst({
      where: { email },
    });

    if (existingToken) {
      // Delete or update the existing token
      await db.secondaryEmailMagicLinkToken.update({
        where: { id: existingToken.id },
        data: { token, expires },
      });
      return existingToken;
    }

    // Create and store the new verification token in the database
    const newToken = await db.secondaryEmailMagicLinkToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return newToken;
  } catch (error) {
    console.error("Error generating secondary magic verification token:", error);
    throw new Error(
      "Could not generate secondary magic verification token. Please try again later."
    );
  }
};