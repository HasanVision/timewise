import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../../../lib/database.js';

const JWT_SECRET = process.env["JWT_SECRET"]!;
const JWT_EXPIRATION = '15m'; // Access token expires in 15 minutes
const REFRESH_TOKEN_EXPIRATION = '7d'; // Refresh token expires in 7 days

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
     res.status(400).json({ message: 'Please enter all fields' });
     return
  }

  try {
    const existingUser = await db.user.findUnique({ where: { email } });
    if (!existingUser) {
       res.status(400).json({ message: 'Invalid credentials' });
       return
    }

    if (!existingUser.emailVerified) {
      res.status(403).json({ message: 'Please verify your email before logging in.' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password!);
    if (!isPasswordValid) {
       res.status(400).json({ message: 'Invalid credentials' });
       return
    }
    

    // Generate JWT tokens
    const accessToken = jwt.sign({ id: existingUser.id, email: existingUser.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });
    const refreshToken = jwt.sign({ id: existingUser.id, email: existingUser.email }, JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });

    // Send tokens back
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    res.json({ accessToken, user: { id: existingUser.id, email: existingUser.email } });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in.' });
  }
};


