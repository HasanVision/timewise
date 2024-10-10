// userRoutes.ts
import express from 'express';
import { login } from './loginController.js';
import { authenticateToken } from '../middlewares/authMiddlewares.js';
import  refreshToken from './authController.js';
import { logout } from './authController.js';

const router = express.Router();


// Public routes
router.post('/login', login);
router.post('/token', refreshToken);

// Protected routes
router.post('/logout', authenticateToken, logout);
router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the protected dashboard!', user: req.user });
});

export default router;