import { register, login, currentUser } from './userController.js';
import forgotPasswordHandler from './forgotPasswordController.js';


import express from 'express';
import verifyResetPasswordToken from './forgotPasswordVerificationController.js';
import newPasswordHandler from './newPasswordHandler.js';
import verifyMagicLinkHandler from './magicVerificationController.js';




const UserRoute = express.Router();

UserRoute.post('/register', register);
UserRoute.post('/login', login);
UserRoute.get('/current-user', currentUser);
UserRoute.post('/forgot-password', forgotPasswordHandler);
UserRoute.post('/verify-reset-password-token', verifyResetPasswordToken);
UserRoute.post('/new-password', newPasswordHandler);
UserRoute.post('/verify-magic-link', verifyMagicLinkHandler);


export default UserRoute;