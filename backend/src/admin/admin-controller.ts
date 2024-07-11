import { Request, Response } from 'express';
import adminService from './admin-service';
import { admin } from 'googleapis/build/src/apis/admin';

class AdminController {
  async check(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({ result: "Ok" });
    } catch (error) {
      console.error('Failed to login admin:', error);
      res.status(500).json({ message: 'Failed to login admin' });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await adminService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const user = await adminService.getUserByEmail(email);
      res.status(201).json(user);
    } catch (err: any) {
      console.error('Not found', err);
      res.status(500).json({ message: 'Not found' });
    }
  }
}

export default new AdminController();
