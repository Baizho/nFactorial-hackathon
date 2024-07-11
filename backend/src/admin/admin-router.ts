import { Router } from 'express';
import { adminMiddleware } from '../middlewares/admin-middleware';
import adminController from './admin-controller';

const adminRouter = Router();

adminRouter.get('/user/all', adminMiddleware, adminController.getAllUsers);
adminRouter.post('/userByEmail', adminMiddleware, adminController.getUserByEmail);
adminRouter.get('/admin/check', adminMiddleware, adminController.check);

export default adminRouter;
