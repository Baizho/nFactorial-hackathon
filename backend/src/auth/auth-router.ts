import { Router } from 'express';
import AuthController from './auth-controller';
import AuthService from './auth-service';

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/loginUser", authController.loginUser);

export default authRouter;
