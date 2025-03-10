import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGetApiTripsId, useDeleteApiTripsId } from '../api/generated/trips/trips';
import { Activity, Trip } from '../api/generated/schemas';

// Extended Trip type to include optional destination
type ExtendedTrip = Trip & {
  destination?: string;
};

// Extended Activity type to include missing properties
type ExtendedActivity = Activity & {
  time?: string;
  cost?: number;
};

export const TripDetails = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const { 
    data: trip, 
    isLoading: tripLoading, 
    isError: tripError,
    error: tripErrorDetails
  } = useGetApiTripsId(Number(tripId) || 0);
  
  // For now, we'll handle activities differently since the API structure has changed
  // In a real app, you would implement the activities API calls
  const activities: ExtendedActivity[] = [];
  const activitiesLoading = false;
  const activitiesError = false;
  
  const { mutate: deleteTrip, isPending: isDeleting } = useDeleteApiTripsId({
    mutation: {
      onSuccess: () => {
        navigate('/trips');
      }
    }
  });
  
  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };
  
  const handleDeleteConfirm = () => {
    if (tripId) {
      deleteTrip({ id: Number(tripId) });
    }
  };
  
  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };
  
  // Group activities by date (empty for now)
  const groupedActivities: Record<string, Activity[]> = {};
  
  if (tripLoading) {
    return <div>Loading trip details...</div>;
  }
  
  if (tripError || !trip) {
    return (
      <div className="error-container">
        <h2>Error loading trip</h2>
        <p>
          {typeof tripErrorDetails === 'object' && tripErrorDetails !== null
            ? String(tripErrorDetails)
            : 'Trip not found or an error occurred'}
        </p>
        <Link to="/trips" className="btn btn-primary">
          Back to Trips
        </Link>
      </div>
    );
  }
  
  return (
    <div className="trip-details-container">
      <div className="trip-header">
        <h1>{trip.title}</h1>
        <div className="trip-actions">
          <Link to={`/trips/${tripId}/edit`} className="btn btn-secondary">
            Edit Trip
          </Link>
          <button onClick={handleDeleteClick} className="btn btn-danger">
            Delete Trip
          </button>
        </div>
      </div>
      
      <div className="trip-info">
        <div className="trip-dates">
          <strong>Dates:</strong> 
          {trip.startDate && new Date(trip.startDate).toLocaleDateString()} - 
          {trip.endDate && new Date(trip.endDate).toLocaleDateString()}
        </div>
        
        {(trip as ExtendedTrip).destination && (
          <div className="trip-destination">
            <strong>Destination:</strong> {(trip as ExtendedTrip).destination}
          </div>
        )}
        
        {trip.description && (
          <div className="trip-description">
            <strong>Description:</strong>
            <p>{trip.description}</p>
          </div>
        )}
      </div>
      
      <div className="activities-section">
        <div className="activities-header">
          <h2>Activities</h2>
          <Link to={`/trips/${tripId}/activities/new`} className="btn btn-primary">
            Add Activity
          </Link>
        </div>
        
        {activitiesLoading ? (
          <div>Loading activities...</div>
        ) : activitiesError ? (
          <div className="error-message">Error loading activities</div>
        ) : activities && activities.length > 0 ? (
          <div className="activities-timeline">
            {Object.entries(groupedActivities || {})
              .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
              .map(([date, dayActivities]) => (
                <div key={date} className="day-activities">
                  <h3 className="activity-date">
                    {new Date(date).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </h3>
                  <div className="activities-list">
                    {dayActivities
                      .sort((a, b) => {
                        const activityA = a as ExtendedActivity;
                        const activityB = b as ExtendedActivity;
                        if (!activityA.time || !activityB.time) return 0;
                        return activityA.time.localeCompare(activityB.time);
                      })
                      .map((activity) => {
                        const extActivity = activity as ExtendedActivity;
                        return (
                          <div key={activity.id} className="activity-card">
                            <div className="activity-time">
                              {extActivity.time || 'No time specified'}
                            </div>
                            <div className="activity-content">
                              <h4>{activity.title}</h4>
                              {activity.location && (
                                <div className="activity-location">
                                  <strong>Location:</strong> {activity.location}
                                </div>
                              )}
                              {activity.description && (
                                <p className="activity-description">{activity.description}</p>
                              )}
                              {extActivity.cost !== undefined && extActivity.cost !== null && (
                                <div className="activity-cost">
                                  <strong>Cost:</strong> ${extActivity.cost.toFixed(2)}
                                </div>
                              )}
                            </div>
                            <div className="activity-actions">
                              <Link
                                to={`/trips/${tripId}/activities/${activity.id}/edit`}
                                className="btn btn-sm btn-outline"
                              >
                                Edit
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No activities added to this trip yet.</p>
            <Link to={`/trips/${tripId}/activities/new`} className="btn btn-primary">
              Add Your First Activity
            </Link>
          </div>
        )}
      </div>
      
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Trip</h3>
            <p>Are you sure you want to delete this trip? This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                onClick={handleDeleteConfirm}
                className="btn btn-danger"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete Trip'}
              </button>
              <button onClick={handleDeleteCancel} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 