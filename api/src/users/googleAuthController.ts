import express from 'express';
const authController = express.Router();

authController.get('/google', (req, res) => {
  const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env['GOOGLE_CLIENT_ID']}&response_type=token&redirect_uri=http://localhost:4000/auth/google/callback&scope=email%20profile`;
  res.redirect(redirectUri);
});

export default authController;