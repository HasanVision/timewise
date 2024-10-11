import { RequestHandler } from 'express';
import { db } from '../../../lib/database.js';
import { sendWelcomeEmail } from '../../../lib/mail.js';

const magicVerifyToken: RequestHandler = async (req, res) => {
  const { token } = req.body;

  console.log('Received magic token for verification:', token);

  if (!token) {
    res.status(400).json({ message: 'Token is required' });
    return; 
  }

  try {
 
    const verificationToken = await db.magicLinkToken.findUnique({
      where: { token },
    });

    console.log('Token magic fetched from database:', verificationToken);

    if (!verificationToken || verificationToken.expires < new Date()) {
      res.status(400).json({ message: 'Invalid or expired token' });
      return; 
    }

    const user = await db.user.findUnique({
      where: { primaryEmail: verificationToken.email },
    });

    if (!user) {
       res.status(400).json({ message: 'User not found.' });
       return
    }


    await db.user.update({
      where: { primaryEmail: verificationToken.email },
      data: { primaryEmailVerified: new Date() },
    });

    // await sendWelcomeEmail(user.email, user.firstname);

  
    await db.magicLinkToken.delete({ where: { token } });

    console.log('User verified successfully.');

    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ message: 'An error occurred during verification. Please try again later.' });
  }
};

export default magicVerifyToken;

// TODO: put back the welcome email when deploying to production