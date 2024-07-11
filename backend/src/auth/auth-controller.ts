import { Request, Response } from 'express';
import AuthService from './auth-service';

const authService = new AuthService();

class AuthController {
  async loginUser(req: Request, res: Response) {
    const { email, birthDate } = req.body;

    if (!email || !birthDate) {
      return res.status(400).json({ error: 'Email and birth date are required.' });
    }

    const user = await authService.loginUser(email, birthDate);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(401).json({ error: 'Invalid email or birth date.' });
    }
  }
}

export default AuthController;
