import { Link } from 'react-router-dom';
import { useGetApiTrips } from '../api/generated/trips/trips';
import { Trip } from '../api/generated/schemas';

// Extended Trip type to include optional destination
type ExtendedTrip = Trip & {
  destination?: string;
};

export const TripsList = () => {
  const { data: trips, isLoading, isError, error } = useGetApiTrips();
  
  if (isLoading) {
    return <div>Loading trips...</div>;
  }
  
  if (isError) {
    return (
      <div className="error-container">
        <h2>Error loading trips</h2>
        <p>{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
      </div>
    );
  }
  
  return (
    <div className="trips-list-container">
      <div className="trips-header">
        <h1>My Trips</h1>
        <Link to="/trips/new" className="btn btn-primary">
          Add New Trip
        </Link>
      </div>
      
      {trips && trips.length > 0 ? (
        <div className="trips-grid">
          {trips.map((trip: Trip) => (
            <div key={trip.id} className="trip-card">
              <h2>{trip.title}</h2>
              <p className="trip-dates">
                {trip.startDate && new Date(trip.startDate).toLocaleDateString()} - 
                {trip.endDate && new Date(trip.endDate).toLocaleDateString()}
              </p>
              {(trip as ExtendedTrip).destination && (
                <p className="trip-destination">
                  <strong>Destination:</strong> {(trip as ExtendedTrip).destination}
                </p>
              )}
              {trip.description && <p className="trip-description">{trip.description}</p>}
              
              <div className="trip-actions">
                <Link to={`/trips/${trip.id}`} className="btn btn-secondary">
                  View Details
                </Link>
                <Link to={`/trips/${trip.id}/edit`} className="btn btn-outline">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>You haven't created any trips yet.</p>
          <Link to="/trips/new" className="btn btn-primary">
            Create Your First Trip
          </Link>
        </div>
      )}
    </div>
  );
}; 