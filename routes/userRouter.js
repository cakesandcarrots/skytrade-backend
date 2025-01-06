import express from 'express'
import { createUser, fetchLoggedInUserDetails, updateUserById } from '../controllers/userController.js';
import { isAuth } from '../services/common.js';

const userRouter = express.Router();

userRouter.get('/',isAuth(),fetchLoggedInUserDetails).post('/',createUser)
userRouter.patch('/:id',updateUserById)


export default userRouter