// import { RequestHandler } from 'express';
// import { db } from '../../../lib/database.js';
// import { sendWelcomeEmail } from '../../../lib/mail.js';

// const magicVerifyTokenForSecondaryEmail: RequestHandler = async (req, res) => {
//   const { secondaryToken } = req.body;

//   console.log('Received magic token for verification:', secondaryToken);

//   if (!secondaryToken) {
//     res.status(400).json({ message: 'Token is required' });
//     return; 
//   }

//   try {
 
//     const verificationToken = await db.secondaryMagicLinkToken.findUnique({
//       where: { secondaryToken },
//     });

//     console.log('Token magic fetched from database:', verificationToken);

//     if (!verificationToken || verificationToken.expires < new Date()) {
//       res.status(400).json({ message: 'Invalid or expired token' });
//       return; 
//     }

//     const user = await db.user.findUnique({
//       where: { secondaryEmail: verificationToken.secondaryEmail },
//     });

//     if (!user) {
//        res.status(400).json({ message: 'User not found.' });
//        return
//     }


//     await db.user.update({
//       where: { primaryEmail: verificationToken.secondaryEmail },
//       data: { primaryEmailVerified: new Date() },
//     });

//     // await sendWelcomeEmail(user.email, user.firstname);

  
//     await db.secondaryMagicLinkToken.delete({ where: { secondaryToken } });

//     console.log('User verified successfully.');

//     res.status(200).json({ message: 'Email verified successfully!' });
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     res.status(500).json({ message: 'An error occurred during verification. Please try again later.' });
//   }
// };

// export default magicVerifyTokenForSecondaryEmail;

// // TODO: put back the welcome email when deploying to production