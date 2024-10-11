import { RequestHandler } from 'express';
import { db } from '../../../lib/database.js'; // Assuming you have access to the db here
import { CustomJwtPayload } from '../../../types/custom'; // Your custom type

const currentUser: RequestHandler = async (req, res) => {
  try {
    const user = req.user as CustomJwtPayload; // Casting to your custom payload type

    if (!user) {
      res.status(401).json({ message: 'Unauthorized: No user found' });
      return;
    }

    // Fetch the user's data from the database
    const existingUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        primaryEmail: true,
        firstname: true,  
        lastname: true,   
      },
    });

    if (!existingUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Return the user information
    res.json({
      id: existingUser.id,
      email: existingUser.primaryEmail,
      firstname: existingUser.firstname, 
      lastname: existingUser.lastname,   
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { currentUser };