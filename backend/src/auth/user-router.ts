import { Router } from 'express';
import UserController from './user-controller';
import { authMiddleware } from "../middlewares/auth-middleware";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/userEmail", userController.getUserByEmail);
userRouter.post("/checkUserApplication", userController.checkUserApplication);
userRouter.post("/assignTask", userController.assignTask);
userRouter.post("/taskResponse", userController.taskResponse);

export default userRouter;
