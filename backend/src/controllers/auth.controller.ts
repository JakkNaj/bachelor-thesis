import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../app';
import { JWT_SECRET } from '../config/passport';
import type { TCreateUserArgs, TLoginUserArgs } from '../types/auth.types';
import type { User } from '@prisma/client';

export const authController = {
  signup: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, name, password } = req.body as TCreateUserArgs;

      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        res.status(400).json({ message: 'Email already exists' });
        return;
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
      
      res.status(201).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      next(error);
    }
  },

  login: (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate('local', { session: false }, (err: Error | null, user: User | false) => {
      if (err) {
        return next(err);
      }
      
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET);
      
      // Set HttpOnly cookie for web clients
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure in production
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
      
      res.json({
        token, // Still send token in response for mobile clients
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    })(req, res, next);
  },
    
  async logout(req: Request, res: Response): Promise<void> {
    try {
      // Clear the JWT cookie
      res.clearCookie('token');
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error during logout' });
    }
  }
};