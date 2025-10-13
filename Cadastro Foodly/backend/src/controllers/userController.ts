import { Request, Response } from 'express';
import { User } from '../models/User';

export const userController = {
  async getUserByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      const user = await User.findByEmail(email);

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone, password } = req.body;

      if (!name || !email || !phone || !password) {
        res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        return;
      }

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: 'Email já cadastrado' });
        return;
      }

      const newUser = await User.create({ name, email, phone, password });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },
};