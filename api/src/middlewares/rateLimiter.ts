
import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    handler: (req, res) => {
      console.log(`IP ${req.ip} blocked for too many requests`);
      res.status(429).json({ message: 'Too many login attempts, please try again later.' });
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

export const resetPasswordLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 3, 
  message: 'Too many password reset requests, please try again after 30 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});