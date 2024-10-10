import { RequestHandler } from 'express';
import { authenticateToken } from '../middlewares/authMiddlewares';
import { CustomJwtPayload } from '../../../types/custom'; // Import your custom type

const currentUser: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as CustomJwtPayload; // Explicitly cast `req.user` to `CustomJwtPayload`

    if (!user) {
       res.status(401).json({ message: 'Unauthorized: No user found' });
       return
    }

    // Send user data back to the client
    res.json({
      id: user.id,
      email: user.email,
      name: user['name'], // Adjust depending on what information is stored in req.user
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { currentUser };