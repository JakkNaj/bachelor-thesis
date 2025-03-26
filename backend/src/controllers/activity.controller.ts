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
      
      console.log("adding activity to trip", tripId);
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
      
      const data = {
        ...req.body,
        startTime: new Date(req.body.startTime).toISOString(),
        endTime: req.body.endTime ? new Date(req.body.endTime).toISOString() : null,
        tripId
      };

      console.log("creating activity in db", data);
      const activity = await prisma.activity.create({
        data
      });
      
      res.status(201).json(activity);
    } catch (error) {
      console.error('Error details:', error);
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

      const newStartTime = req.body.startTime ? new Date(req.body.startTime) : activity.startTime;
      const newEndTime = req.body.endTime ? new Date(req.body.endTime) : activity.endTime;

      const tripStartDate = new Date(activity.trip.startDate);
      const tripEndDate = new Date(activity.trip.endDate);

      if (newStartTime < tripStartDate || newStartTime > tripEndDate) {
        res.status(400).json({ 
          message: 'Activity start time must be within trip date range',
          tripDateRange: {
            start: tripStartDate.toISOString(),
            end: tripEndDate.toISOString()
          }
        });
        return;
      }

      if (newEndTime && (newEndTime < tripStartDate || newEndTime > tripEndDate)) {
        res.status(400).json({ 
          message: 'Activity end time must be within trip date range',
          tripDateRange: {
            start: tripStartDate.toISOString(),
            end: tripEndDate.toISOString()
          }
        });
        return;
      }

      if (newEndTime && newStartTime > newEndTime) {
        res.status(400).json({ message: 'Activity end time must be after start time' });
        return;
      }

      const updateData = {
        ...req.body,
        startTime: newStartTime.toISOString(),
        endTime: newEndTime?.toISOString() || null
      };
      
      // Update the activity
      const updatedActivity = await prisma.activity.update({
        where: { id: activityId },
        data: updateData,
        include: { trip: true }
      });
      
      res.json(updatedActivity);
    } catch (error) {
      console.error('Error updating activity:', error);
      res.status(500).json({ 
        message: 'Error updating activity',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
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