import { register } from './registerController.js';
import { login } from './loginController.js';
import { currentUser } from './currentUser.js';
import forgotPasswordHandler from './forgotPasswordController.js';
import { loginLimiter, resetPasswordLimiter } from '../middlewares/rateLimiter.js';
import fetchAndStoreIPInfo  from '../middlewares/IpMiddleware.js';
import express from 'express';
import verifyResetPasswordToken from './forgotPasswordVerificationController.js';
import newPasswordHandler from './newPasswordHandler.js';
import verifyMagicLinkHandler from './magicVerificationController.js';
import  resendVerification  from './resendVerification.js';
import fetchAndCompareIP from '../middlewares/ipMiddlewareCompare.js';
import { updateUser } from './updateUser.js';
import { authenticateToken } from '../middlewares/authMiddlewares.js';
import { updateSecondaryEmail} from './updateSecondaryEmail.js';




const UserRoute = express.Router();

UserRoute.use(fetchAndStoreIPInfo);
UserRoute.post('/register', register);
UserRoute.post('/login', loginLimiter ,login);
UserRoute.get('/current-user',authenticateToken, currentUser);
UserRoute.post('/forgot-password', resetPasswordLimiter, forgotPasswordHandler);
UserRoute.post('/verify-reset-password-token', verifyResetPasswordToken);
UserRoute.post('/new-password', resetPasswordLimiter, newPasswordHandler);
UserRoute.post('/verify-magic-link', verifyMagicLinkHandler);
UserRoute.post('/resend-verification', resendVerification);
UserRoute.put('/update-user', authenticateToken, updateUser);
UserRoute.put('/update-secondary-email', authenticateToken, updateSecondaryEmail);


export default UserRoute;

// TODO: test Ip info middleware when the app is deployed
// TODO: test Ip COMPARE when the app is deployed