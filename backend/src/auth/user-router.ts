import { Router } from 'express';
import UserController from './user-controller';
import { authMiddleware } from "../middlewares/auth-middleware";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/userEmail", userController.getUserByEmail);
userRouter.post("/checkUserApplication", userController.checkUserApplication);
userRouter.post("/assignTask", userController.assignTask);
userRouter.post("/getAssignTask", userController.getAssignTask);
userRouter.post("/taskResponse", userController.taskResponse);
userRouter.post("/getResponseTask", userController.getTaskResponse);

export default userRouter;
