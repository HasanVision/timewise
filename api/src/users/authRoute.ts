import { register, currentUser } from './registerController.js';
import { login } from './loginController.js';
import forgotPasswordHandler from './forgotPasswordController.js';

import fetchAndStoreIPInfo  from '../middlewares/IpMiddleware.js';
import express from 'express';
import verifyResetPasswordToken from './forgotPasswordVerificationController.js';
import newPasswordHandler from './newPasswordHandler.js';
import verifyMagicLinkHandler from './magicVerificationController.js';
import  resendVerification  from './resendVerification.js';




const UserRoute = express.Router();
UserRoute.use(fetchAndStoreIPInfo);
UserRoute.post('/register', register);
UserRoute.post('/login', login);
UserRoute.get('/current-user', currentUser);
UserRoute.post('/forgot-password', forgotPasswordHandler);
UserRoute.post('/verify-reset-password-token', verifyResetPasswordToken);
UserRoute.post('/new-password', newPasswordHandler);
UserRoute.post('/verify-magic-link', verifyMagicLinkHandler);
UserRoute.post('/resend-verification', resendVerification);


export default UserRoute;