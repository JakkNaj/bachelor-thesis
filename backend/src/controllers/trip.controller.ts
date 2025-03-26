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

      const { startDate, endDate, ...restBody } = req.body;
      
      const trip = await prisma.trip.create({
        data: {
          ...restBody,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          userId: req.user.id
        }
      });
      
      res.status(201).json(trip);
    } catch (error) {
      console.error('Trip creation error:', error);
      res.status(500).json({ message: 'Error creating trip', error: error });
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

      // Format dates if they are provided
      const updateData = {
        ...req.body,
        ...(req.body.startDate && { startDate: new Date(req.body.startDate) }),
        ...(req.body.endDate && { endDate: new Date(req.body.endDate) })
      };

      // Validate dates
      if (updateData.startDate && updateData.endDate && 
          new Date(updateData.startDate) > new Date(updateData.endDate)) {
        res.status(400).json({ message: 'Start date cannot be after end date' });
        return;
      }
      
      // Check if trip exists and belongs to user
      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
        include: {
          activities: true
        }
      });
      
      if (!trip) {
        res.status(404).json({ message: 'Trip not found' });
        return;
      }
      
      if (trip.userId !== req.user.id) {
        res.status(403).json({ message: 'You do not have permission to update this trip' });
        return;
      }

      // If dates are being updated, validate activities
      if (updateData.startDate || updateData.endDate) {
        const newStartDate = updateData.startDate ? new Date(updateData.startDate) : trip.startDate;
        const newEndDate = updateData.endDate ? new Date(updateData.endDate) : trip.endDate;

        const invalidActivities = trip.activities.filter(activity => {
          const activityStart = new Date(activity.startTime);
          const activityEnd = activity.endTime ? new Date(activity.endTime) : activityStart;
          
          return activityStart < newStartDate || activityEnd > newEndDate;
        });

        if (invalidActivities.length > 0) {
          res.status(400).json({ 
            message: 'Cannot update trip dates: Some activities would fall outside the new date range',
            invalidActivities: invalidActivities.map(a => ({ id: a.id, title: a.title }))
          });
          return;
        }
      }
      
      // Update the trip
      const updatedTrip = await prisma.trip.update({
        where: { id: tripId },
        data: updateData,
        include: {
          activities: true
        }
      });
      
      res.json(updatedTrip);
    } catch (error) {
      console.error('Error updating trip:', error);
      res.status(500).json({ 
        message: 'Error updating trip',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
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
      res.status(500).json({ message: 'Error deleting trip', error: error });
    }
  }
}; 