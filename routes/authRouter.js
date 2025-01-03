import express from 'express'
import { login, logout,checkAuth, resetPassword } from '../controllers/authController.js'
import { resetPasswordRequest } from '../controllers/authController.js';
import passport from 'passport';
const authRouter = express.Router()

authRouter.post('/',passport.authenticate('local'),login).get('/',logout);
authRouter.get('/check',passport.authenticate('jwt'), checkAuth)
authRouter.post('/reset-password-request',resetPasswordRequest)
authRouter.post('/reset-password',resetPassword)


export default authRouter;