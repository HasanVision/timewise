import { RequestHandler } from 'express';
import { db } from '../../../lib/database.js';
import bcrypt from 'bcryptjs';
import { generateVerificationToken } from '../../../lib/data/generateVerificationToken.js';
import { sendVerificationEmail } from '../../../lib/mail.js';

const register: RequestHandler = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        console.log('Please enter all fields');
        res.status(400).json({ message: 'Please enter all fields' });
        return;
    }

    try {
        // console.log('Checking for existing user...');
        const existingUser = await db.user.findUnique({ where: { email } });

        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with selected fields only
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

        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )


        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'An error occurred while creating the user. Please try again later.' });
    }
};

const login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Please enter all fields');
        res.status(400).json({ message: 'Please enter all fields' });
        return;
    }

    try {
        // console.log('Checking for existing user...');
        const existingUser = await db.user.findUnique({ where: { email } });

        if (!existingUser) {
            res.status(400).json({ message: 'User does not exist' });
            return;
        }

        // Ensure existingUser.password is a string before comparing
        if (!existingUser.password) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Rename the password field to avoid shadowing
        const { password: _, ...userWithoutPassword } = existingUser;

        console.log('User logged in:', userWithoutPassword);
        res.json({ message: 'User logged in successfully', user: userWithoutPassword });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'An error occurred while logging in. Please try again later.' });
    }
};

const currentUser: RequestHandler = async (req, res, next) => {
    res.json({ message: 'Current User' });
};

export { register, login, currentUser };