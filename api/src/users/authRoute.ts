import { register, login, currentUser } from './userController.js';
import  verifyToken  from './verficationController.js';
import express from 'express';



const UserRoute = express.Router();

UserRoute.post('/register', register);
UserRoute.post('/login', login);
UserRoute.get('/current-user', currentUser);
UserRoute.post('/verify-token', verifyToken);

export default UserRoute;