import express, { Request, Response, RequestHandler } from 'express';
import { generateVerificationToken } from '../../../lib/data/generateVerificationToken';
import { sendVerificationEmail } from '../../../lib/mail';

const router = express.Router();

const sendVerification: RequestHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: 'Email is required' });
    return; // Exit the function to avoid further execution
  }

  try {
    // Generate a new verification token
    const token = await generateVerificationToken(email);

    // Send the verification email (implement this function using Resend or other email service)
    // await sendVerificationEmail(email, token.token);



    res.status(200).json({ message: 'Verification email sent successfully.' });
  } catch (error) {
    console.error('Error sending verification email:', error);
    res.status(500).json({ message: 'An error occurred while sending the verification email.' });
  }
};

// Register the route
router.post('/send-verification', sendVerification);

export default router;