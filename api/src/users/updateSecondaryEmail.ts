import { CustomJwtPayload } from '../../../types/custom.js';
import { Request, Response } from 'express';
import { db } from '../../../lib/database.js';
import { generateSecondaryMagicVerificationToken } from '../../../lib/data/generateSecondaryMagicLinkToken.js';
import { sendSecondaryEmailVerification } from '../../../lib/mail.js';

const updateSecondaryEmail = async (req: Request, res: Response) => {
    const userId = (req.user as CustomJwtPayload).id;

    if (!userId) {
         res.status(401).json({ message: 'Unauthorized' });
         return
    }

    const { secondaryEmail } = req.body;

    if (!secondaryEmail) {
         res.status(400).json({ message: 'Secondary email is required' });
         return
    }

    try {
        // Check if primaryEmail or secondaryEmail already exists for another user
        const existingEmail = await db.user.findFirst({
            where: { 
                OR: [
                    { primaryEmail: secondaryEmail },
                    { secondaryEmail: secondaryEmail }
                ],
                AND: {
                    id: { not: userId } // Exclude current user
                }
            }
        });

        if (existingEmail) {
             res.status(400).json({ message: 'Email already in use' });
             return
        }

        // Update the secondary email
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: { secondaryEmail }
        });

         res.json({ message: 'Secondary email updated successfully', user: updatedUser });

         const verificationToken = await generateSecondaryMagicVerificationToken(secondaryEmail);
            await sendSecondaryEmailVerification(secondaryEmail, verificationToken.token);
         return

    } catch (error) {
        console.error('Error updating secondary email:', error);
         res.status(500).json({ message: 'Error updating secondary email' });
         return
    }
};

export { updateSecondaryEmail };