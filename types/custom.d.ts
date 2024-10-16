import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string; // Define the type for `user`
    }
  }
}



interface CustomJwtPayload extends JwtPayload {
  id: string;  // Assuming your JWT contains an `id` field
  primaryEmail: string; // Include other fields you expect in the JWT payload
  firstname: string;
  lastname: string;
}
