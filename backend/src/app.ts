import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { passport } from './config/passport';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';


export const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export const server = app;