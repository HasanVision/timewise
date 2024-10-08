import { db } from '../database.js'; // Adjust path as necessary
import crypto from 'crypto';
import { sendResetPasswordEmail } from '../mail.js';

export const generateResetPasswordToken = async (email: string) => {
  const token = crypto.randomUUID(); // Generate a unique token
  const expires = new Date(Date.now() + 3600 * 1000); // Token expires in 1 hour

  // Check if there's already a reset token for this email
  const existingToken = await db.resetPasswordToken.findFirst({
    where: { email },
  });

  if (existingToken) {
    // Delete the old token if it exists
    await db.resetPasswordToken.delete({
      where: { id: existingToken.id },
    });
  }

  // Create a new reset token in the database
  const newResetToken = await db.resetPasswordToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return newResetToken; // Ensure this returns the correct token
};