import { RequestHandler } from 'express';
import { db } from '../../../lib/database.js';
import bcrypt from 'bcryptjs';

const register: RequestHandler = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        console.log('Please enter all fields');
        res.status(400).json({ message: 'Please enter all fields' });

        return;
    }

    try {
        console.log('Checking for existing user...');
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
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'An error occurred while creating the user. Please try again later.' });
    }
};

const login: RequestHandler = async (req, res, next) => {
    res.json({ message: 'Login' });
};

const currentUser: RequestHandler = async (req, res, next) => {
    res.json({ message: 'Current User' });
};

export { register, login, currentUser };