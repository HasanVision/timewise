import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

const JWT_SECRET = process.env["JWT_SECRET"]!;

const authenticateToken: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.accessToken || (req.headers['authorization']?.split(' ')[1]);
  
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  console.log("Received Token", token);

  // Verify the token using the secret
  jwt.verify(token, JWT_SECRET, (err: VerifyErrors | null, decodedToken: JwtPayload | string | undefined) => {
    if (err) {
      console.error("Token verification failed:", err);
      res.status(403).json({ message: 'Token is invalid or expired' });
      return;
    }

    // If verification is successful, decodedToken will contain the payload
    if (decodedToken && typeof decodedToken !== 'string') {
      console.log("Decoded Token:", decodedToken);
      req.user = decodedToken as JwtPayload;  // Safe type assertion
      next();  // Continue to the next middleware
    } else {
      res.status(403).json({ message: 'Invalid token payload' });
    }
  });
};

export { authenticateToken };
