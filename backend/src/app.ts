import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import { passport } from './config/passport';
import { authRouter } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import { tripRoutes } from './routes/trip.routes';
import { activityRoutes } from './routes/activity.routes';
import { specs } from './config/swagger';
import { loggerMiddleware } from './middleware/logger.middleware';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export const prisma = new PrismaClient();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8081', 'http://localhost:4173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Apply logger middleware before other middleware
app.use(loggerMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/activities', activityRoutes);

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