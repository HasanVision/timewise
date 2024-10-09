import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { authenticateToken } from "../middlewares/authMiddlewares"; // Middleware for JWT verification
import { User } from '@prisma/client'; 

const googleAuthRouter = express.Router();
const JWT_SECRET = process.env['JWT_SECRET']!;

// Google OAuth
googleAuthRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
googleAuthRouter.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const user = req.user as User; 
  const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '15m' });
  res.cookie('accessToken', accessToken, { httpOnly: true });
  res.redirect('/dashboard');
});

// Protect routes
googleAuthRouter.get('/dashboard', authenticateToken, (req, res) => {
  const user = req.user as User; 
  if (user) {
    res.json({ message: `Welcome, ${user.email}` });
  } else {
    res.status(401).json({ message: 'User not authenticated' });
  }
});

// Logout route
googleAuthRouter.post('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.json({ message: 'Logged out successfully' });
});

export default googleAuthRouter;