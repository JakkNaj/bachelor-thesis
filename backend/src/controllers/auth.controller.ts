import { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../app';
import { JWT_SECRET } from '../config/passport';
import type { TCreateUserArgs, TLoginUserArgs } from '../types/auth.types';
import type { User } from '@prisma/client';

export const authController = {
  async signup(req: Request<{}, {}, TCreateUserArgs>, res: Response) {
    try {
      const { email, name, password } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword
        }
      });

      const token = jwt.sign({ id: user.id }, JWT_SECRET);
      
      return res.status(201).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating user' });
    }
  },

  async login(req: Request<{}, {}, TLoginUserArgs>, res: Response) {
    passport.authenticate('local', { session: false }, (err: Error | null, user: User | false) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET);
      
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    })(req, res);
  }
};