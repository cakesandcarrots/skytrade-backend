import express from 'express'
import { createUser, fetchLoggedInUserDetails, updateUserById } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/',fetchLoggedInUserDetails).post('/',createUser)
userRouter.patch('/:id',updateUserById)


export default userRouter