import { Request, Response } from 'express';
import { prisma } from '../app';

export const activityController = {
  async addActivityToTrip(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      
      const tripId = parseInt(req.params.tripId);
      
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
        res.status(403).json({ message: 'You do not have permission to modify this trip' });
        return;
      }
      
      // Create the activity
      const activity = await prisma.activity.create({
        data: {
          ...req.body,
          tripId
        }
      });
      
      res.status(201).json(activity);
    } catch (error) {
      res.status(500).json({ message: 'Error adding activity to trip' });
    }
  },
  
  async updateActivity(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      
      const activityId = parseInt(req.params.id);
      
      if (isNaN(activityId)) {
        res.status(400).json({ message: 'Invalid activity ID' });
        return;
      }
      
      // Find the activity and check if it belongs to a trip owned by the user
      const activity = await prisma.activity.findUnique({
        where: { id: activityId },
        include: { trip: true }
      });
      
      if (!activity) {
        res.status(404).json({ message: 'Activity not found' });
        return;
      }
      
      if (activity.trip.userId !== req.user.id) {
        res.status(403).json({ message: 'You do not have permission to update this activity' });
        return;
      }
      
      // Update the activity
      const updatedActivity = await prisma.activity.update({
        where: { id: activityId },
        data: req.body
      });
      
      res.json(updatedActivity);
    } catch (error) {
      res.status(500).json({ message: 'Error updating activity' });
    }
  },
  
  async deleteActivity(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      
      const activityId = parseInt(req.params.id);
      
      if (isNaN(activityId)) {
        res.status(400).json({ message: 'Invalid activity ID' });
        return;
      }
      
      // Find the activity and check if it belongs to a trip owned by the user
      const activity = await prisma.activity.findUnique({
        where: { id: activityId },
        include: { trip: true }
      });
      
      if (!activity) {
        res.status(404).json({ message: 'Activity not found' });
        return;
      }
      
      if (activity.trip.userId !== req.user.id) {
        res.status(403).json({ message: 'You do not have permission to delete this activity' });
        return;
      }
      
      // Delete the activity
      await prisma.activity.delete({
        where: { id: activityId }
      });
      
      res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting activity' });
    }
  }
}; 