import { Request, Response } from 'express';
import { db } from '../../../lib/database.js';  
import bcrypt from 'bcryptjs';
import { CustomJwtPayload } from '../../../types/custom.js';

export const updatePassword = async (req: Request, res: Response) => {
    try {
      const userId = (req.user as CustomJwtPayload).id;
  
      if (!userId) {
         res.status(401).json({ message: 'Unauthorized' });
         return
      }
  
      const { password, newPassword } = req.body;
  
      if (!password || !newPassword) {
         res.status(400).json({ message: 'Both current and new passwords are required' });
         return
      }
  
      const user = await db.user.findUnique({
        where: { id: userId },
      });
  
      if (!user || !user.password) {
         res.status(404).json({ message: 'User not found' });
         return
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         res.status(400).json({ message: 'Current password is incorrect' });
         return
      }
  
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await db.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
      });
  
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ message: 'Error updating password' });
    }
  };