import { Router } from 'express';
import { authenticateJwt } from '../middleware/auth.middleware';
import { userController } from '../controllers/user.controller';

export const userRouter = Router();

// Get user profile with basic info
userRouter.get('/profile', authenticateJwt, userController.getProfile);

// Get all trips for the authenticated user
userRouter.get('/trips', authenticateJwt, userController.getTrips);

// Get a specific trip by ID (with authorization check)
userRouter.get('/trips/:id', authenticateJwt, userController.getTripById); 