import express from 'express'
import { login, logout,checkAuth } from '../controllers/authController.js'
import passport from 'passport';
const authRouter = express.Router()

authRouter.post('/',passport.authenticate('local'),login).get('/',logout);
authRouter.get('/check',passport.authenticate('jwt'), checkAuth)


export default authRouter;