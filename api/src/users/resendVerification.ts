
import { RequestHandler } from "express";
import { generateMagicVerificationToken } from "../../../lib/data/generateMagicLinkToken.js";
import { sendMagicLinkEmail } from "../../../lib/mail.js";
import { db } from "../../../lib/database.js";


const resendCooldownMap = new Map<string, number>();
const resendVerification: RequestHandler = async (req, res) => {
    const { primaryEmail } = req.body;

    if (!primaryEmail) {
         res.status(400).json({ message: 'Email is required' });
         return
      }

    // Rate limiting (5-minute cooldown)
    const cooldownTime = 5 * 60 * 1000; // 5 minutes
    const lastRequestTime = resendCooldownMap.get(primaryEmail);

    if (lastRequestTime && (Date.now() - lastRequestTime) < cooldownTime) {
         res.status(429).json({ message: 'Please wait before resending the verification email.' });
         return;
    }

    try {
        const user = await db.user.findUnique({ where: { primaryEmail } });
        if (!user) {
             res.status(400).json({ message: 'User not found' });
             return
        }

        // Regenerate the verification token and send the email
        const token = await generateMagicVerificationToken(primaryEmail);
        await sendMagicLinkEmail(primaryEmail, token.token);

        // Update the last request time for the cooldown
        resendCooldownMap.set(primaryEmail, Date.now());

        res.status(200).json({ message: 'Verification email sent again!' });
    } catch (error) {
        console.error('Error resending verification email:', error);
        res.status(500).json({ message: 'Could not resend verification email. Try again later.' });
    }
};

export default resendVerification;