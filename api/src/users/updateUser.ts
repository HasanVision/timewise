import { Request, Response } from 'express';
import { db } from '../../../lib/database.js';  
import bcrypt from 'bcryptjs';
import { CustomJwtPayload } from '../../../types/custom.js';


export const updateUser = async (req: Request, res: Response) => {
  const userId = (req.user as CustomJwtPayload).id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  // Safely access user ID and email from req.user (as CustomJwtPayload)

  const { firstname, lastname, password } = req.body;

  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        firstname,
        lastname,
        ...(password && { password: await bcrypt.hash(password, 10) }) // Update password if provided
      }
    });

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user from update user backend' });
  }
};