import { RequestHandler } from 'express';
import { db } from '../../../lib/database.js';
import bcrypt from 'bcryptjs';
import { generateMagicVerificationToken } from '../../../lib/data/generateMagicLinkToken.js';
import { sendMagicLinkEmail } from '../../../lib/mail.js';


const register: RequestHandler = async (req, res ) => {
    const { firstName, lastName, primaryEmail, password } = req.body;

    if (!firstName || !lastName || !primaryEmail || !password) {
        console.log('Please enter all fields');
        res.status(400).json({ message: 'Please enter all fields' });
        return;
    }

    try {
       
        const existingUser = await db.user.findUnique({ where: { primaryEmail } });

        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const newUser = await db.user.create({
            data: {
                firstname: firstName,
                lastname: lastName,
                primaryEmail,
                password: hashedPassword,
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                primaryEmail: true,
                isTwoFactorEnabled: true,
                image: true,
            },
        });

        console.log('User created in the database:', newUser);

        const verificationToken = await generateMagicVerificationToken(primaryEmail);
        await sendMagicLinkEmail(
            verificationToken.email,
            verificationToken.token
        )


        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'An error occurred while creating the user. Please try again later.' });
    }
};



export { register };