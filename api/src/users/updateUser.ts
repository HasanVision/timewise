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


  const { firstname, lastname,email, password } = req.body;

  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        firstname,
        lastname,
        email,
        ...(password && { password: await bcrypt.hash(password, 10) }) 
      }
    });

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user from update user backend' });
  }
};