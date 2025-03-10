import { Request, Response } from 'express';
import { prisma } from '../app';

export const tripController = {
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
  },
  
  async createTrip(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      
      const trip = await prisma.trip.create({
        data: {
          ...req.body,
          userId: req.user.id
        }
      });
      
      res.status(201).json(trip);
    } catch (error) {
      res.status(500).json({ message: 'Error creating trip' });
    }
  },
  
  async updateTrip(req: Request, res: Response): Promise<void> {
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
      
      // Check if trip exists and belongs to user
      const trip = await prisma.trip.findUnique({
        where: { id: tripId }
      });
      
      if (!trip) {
        res.status(404).json({ message: 'Trip not found' });
        return;
      }
      
      if (trip.userId !== req.user.id) {
        res.status(403).json({ message: 'You do not have permission to update this trip' });
        return;
      }
      
      // Update the trip
      const updatedTrip = await prisma.trip.update({
        where: { id: tripId },
        data: req.body
      });
      
      res.json(updatedTrip);
    } catch (error) {
      res.status(500).json({ message: 'Error updating trip' });
    }
  },
  
  async deleteTrip(req: Request, res: Response): Promise<void> {
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
      
      // Check if trip exists and belongs to user
      const trip = await prisma.trip.findUnique({
        where: { id: tripId }
      });
      
      if (!trip) {
        res.status(404).json({ message: 'Trip not found' });
        return;
      }
      
      if (trip.userId !== req.user.id) {
        res.status(403).json({ message: 'You do not have permission to delete this trip' });
        return;
      }
      
      // Delete the trip (this will cascade delete all activities if set up in the schema)
      await prisma.trip.delete({
        where: { id: tripId }
      });
      
      res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting trip' });
    }
  }
}; 