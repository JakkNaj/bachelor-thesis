import { Request, Response } from 'express';
import { prisma } from '../app';

export const userController = {
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            updatedAt: true
            }
        });
        
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        
        res.json(user);
        } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile' });
        }
  },

  async getTrips(req: Request, res: Response): Promise<void> {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const trips = await prisma.trip.findMany({
            where: {
            userId: req.user.id
            },
            include: {
            activities: {
                select: {
                id: true,
                title: true,
                description: true,
                type: true,
                startTime: true,
                endTime: true
                }
            }
            },
            orderBy: {
            startDate: 'asc'
            }
        });
        
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user trips' });
    }
  },

  async getTripById(req: Request, res: Response): Promise<void> {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const tripId = parseInt(req.params.id);
        
        if (isNaN(tripId)) {
            res.status(400).json({ message: 'Invalid trip ID' });
            return;
        }
      
        const trip = await prisma.trip.findUnique({
            where: {
            id: tripId
            },
            include: {
            activities: {
                include: {
                flight: true,
                transport: true,
                accommodation: true,
                food: true,
                reminder: true
                }
            }
            }
        });
      
        if (!trip) {
            res.status(404).json({ message: 'Trip not found' });
            return;
        }
      
        // Check if the trip belongs to the authenticated user
        if (trip.userId !== req.user.id) {
            res.status(403).json({ message: 'You do not have permission to access this trip' });
            return;
        }
        
        res.json(trip);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trip details' });
    }
  }
}; 