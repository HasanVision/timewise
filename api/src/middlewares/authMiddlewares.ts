import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

// Middleware to verify access token
const authenticateToken: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return; // Ensure you return to stop execution
  }

  jwt.verify(token, process.env["JWT_SECRET"]!, (err, user) => {
    if (err) {
      res.status(403).json({ message: 'Token is invalid or expired' });
      return; // Ensure you return to stop execution
    }

    req.user = user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  });
};

export { authenticateToken };