import { CustomJwtPayload } from '../../../types/custom.js';
import { Request, Response } from 'express';
import { db } from '../../../lib/database.js';

const updateSecondaryEmail = async (req: Request, res: Response) => {
    const userId = (req.user as CustomJwtPayload).id;
    
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    
    const { secondaryEmail } = req.body;
    
    try {
        const updatedUserSecondaryEmail = await db.user.update({
        where: { id: userId },
        data: {
            secondaryEmail,
        },
        });
    
        res.json({ message: 'Secondary email updated successfully', user: updatedUserSecondaryEmail });
    } catch (error) {
        res.status(500).json({ message: 'Error updating secondary email' });
    }
    }

    export { updateSecondaryEmail };