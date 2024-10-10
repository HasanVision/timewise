import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

const authenticateToken: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.accessToken || (req.headers['authorization']?.split(' ')[1]);
  console.log('headers', req.headers);
  console.log('cookies', req.cookies);
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return; 
  }

  console.log("Received Token", token);

  jwt.verify(token, process.env["JWT_SECRET"]!, (err: VerifyErrors | null, user: JwtPayload | string | undefined) => {
    console.log("Decoded Token", user);
    if (err) {
      res.status(403).json({ message: 'Token is invalid or expired' });
      return; 
    }

    req.user = user as JwtPayload; // Type assertion to access `JwtPayload` fields
    next(); 
  });
};

export { authenticateToken };