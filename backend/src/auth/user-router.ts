import { Router } from 'express';
import UserController from './user-controller';
import { authMiddleware } from "../middlewares/auth-middleware";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/userEmail", userController.getUserByEmail);

export default userRouter;
