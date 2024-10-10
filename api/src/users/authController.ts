import { RequestHandler } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

const refreshTokenHandler: RequestHandler = (req, res) => {

  const JWT_SECRET = process.env['JWT_SECRET'];

  if (!JWT_SECRET) {
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    res.status(401).json({ message: 'No refresh token provided' });
    return;
  }

  // Verify the refresh token
  jwt.verify(refreshToken, JWT_SECRET, (err: VerifyErrors | null, decodedToken: JwtPayload | string | undefined) => {
    if (err) {
      res.status(403).json({ message: 'Refresh token is invalid or expired' });
      return;
    }

    if (decodedToken && typeof decodedToken !== 'string') {
      const { id, email } = decodedToken as JwtPayload;

      // Generate a new access token
      const accessToken = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '15m' });
      res.json({ accessToken });
    } else {
      res.status(403).json({ message: 'Invalid refresh token payload' });
    }
  });
};

export { refreshTokenHandler };

export const logout: RequestHandler = async (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  };