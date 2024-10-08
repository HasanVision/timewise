import { RequestHandler } from 'express';
import { db } from '../../../lib/database.js'; // Adjust the path as necessary

const verifyToken: RequestHandler = async (req, res) => {
  const { token } = req.body;

  console.log('Received token for verification:', token);

  if (!token) {
    res.status(400).json({ message: 'Token is required' });
    return; 
  }

  try {
 
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    console.log('Token fetched from database:', verificationToken);

    if (!verificationToken || verificationToken.expires < new Date()) {
      res.status(400).json({ message: 'Invalid or expired token' });
      return; 
    }


    await db.user.update({
      where: { email: verificationToken.email },
      data: { emailVerified: new Date() },
    });

  
    await db.verificationToken.delete({ where: { token } });

    console.log('User verified successfully.');

    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ message: 'An error occurred during verification. Please try again later.' });
  }
};

export default verifyToken;