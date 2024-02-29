import express, { Router } from 'express';
import { UserSignUp, userLogin } from '../controller/users.Controller';
const userRouter: Router = express.Router();


userRouter.post('/signUp',  UserSignUp )
userRouter.post('/login',userLogin)
export default userRouter;
