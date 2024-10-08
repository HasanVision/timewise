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
       res.status(400).json({ message: 'User does not exist' });
       return
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




// import { RequestHandler } from 'express';
// import { db } from '../../../lib/database.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import express from 'express';

// const router = express.Router();
// const JWT_SECRET = process.env["JWT_SECRET"]
// const JWT_EXPIRATION = process.env["JWT_EXPIRATION"]
// const REFRESH_TOKEN_EXPIRATION = process.env["REFRESH_TOKEN_EXPIRATION"]


// const login: RequestHandler = async (req, res, next) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         console.log('Please enter all fields');
//         res.status(400).json({ message: 'Please enter all fields' });
//         return;
//     }

//     try {
       
//         const existingUser = await db.user.findUnique({ where: { email } });

//         if (!existingUser) {
//             res.status(401).json({ message: 'User does not exist' });
//             return;
//         }

      
//         if (!existingUser.password) {
//             res.status(401).json({ message: 'Invalid credentials' });
//             return;
//         }

        
//         const isPasswordValid = await bcrypt.compare(password, existingUser.password);

//         if (!isPasswordValid) {
//             res.status(400).json({ message: 'Invalid credentials' });
//             return;
//         }
        

       
//         const { password: _, ...userWithoutPassword } = existingUser;

        

//         console.log('User logged in:', userWithoutPassword);
//         res.json({ message: 'User logged in successfully', user: userWithoutPassword });
//     } catch (error) {
//         console.error('Error logging in:', error);
//         res.status(500).json({ message: 'An error occurred while logging in. Please try again later.' });
//     }
// };



// export { login };