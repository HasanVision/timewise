import { RequestHandler } from 'express';
import { db } from '../../../lib/database.js'; 
import bcrypt from 'bcryptjs';
import { sendPasswordResetSuccessEmail } from '../../../lib/mail.js';

 const newPasswordHandler: RequestHandler = async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
     res.status(400).json({ message: 'Token and new password are required' });
     return;
  }

  try {
    const resetToken = await db.resetPasswordToken.findUnique({ where: { token } });

    if (!resetToken || resetToken.expires < new Date()) {
       res.status(400).json({ message: 'Invalid or expired token' });
       return;
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
      where: { primaryEmail: resetToken.email },
      data: { password: hashedPassword }
    });

    await sendPasswordResetSuccessEmail(resetToken.email);
    // Delete the token after successful reset
    await db.resetPasswordToken.delete({ where: { token } });

     res.status(200).json({ message: 'Password reset successfully!' });
  } catch (error) {
     res.status(500).json({ message: 'An error occurred. Please try again later.' });
     return
  }
};

export default newPasswordHandler;