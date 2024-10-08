import { RequestHandler } from 'express';
import { db } from '../../../lib/database.js';
import bcrypt from 'bcryptjs';
import { generateMagicVerificationToken } from '../../../lib/data/generateMagicLinkToken.js';
import { sendMagicLinkEmail } from '../../../lib/mail.js';


const register: RequestHandler = async (req, res ) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        console.log('Please enter all fields');
        res.status(400).json({ message: 'Please enter all fields' });
        return;
    }

    try {
       
        const existingUser = await db.user.findUnique({ where: { email } });

        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const newUser = await db.user.create({
            data: {
                firstname: firstName,
                lastname: lastName,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                isTwoFactorEnabled: true,
                role: true,
                image: true,
            },
        });

        console.log('User created in the database:', newUser);

        const verificationToken = await generateMagicVerificationToken(email);
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


const currentUser: RequestHandler = async (req, res, next) => {
    res.json({ message: 'Current User' });
};

export { register, currentUser };