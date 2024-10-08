import express, { RequestHandler } from 'express';
import { db } from '../../../lib/database.js';
import { generateResetPasswordToken } from '../../../lib/data/generateRestPasswordToken.js'; 
import { sendResetPasswordEmail } from '../../../lib/mail.js'; 

const router = express.Router();

const forgotPasswordHandler: RequestHandler = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: 'Email is required' });
    return;
  }

  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ message: 'User does not exist' });
      return;
    }

    // Generate reset token
    const resetToken = await generateResetPasswordToken(email);

    // Send the reset password email
    await sendResetPasswordEmail(email, resetToken.token);

    res.status(200).json({ message: 'Reset password link sent to your email.' });
  } catch (error) {
    console.error('Error processing forgot password request:', error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};


export default forgotPasswordHandler;