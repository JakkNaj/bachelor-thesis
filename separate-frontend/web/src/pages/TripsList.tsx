import { Link } from 'react-router-dom';
import { useGetApiTrips } from '../api/generated/trips/trips';
import { Trip } from '../api/generated/schemas';
import { TripCard } from '../components/TripCard';

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
            <TripCard 
              key={trip.id}
              id={trip.id}
              title={trip.title} 
              description={trip.description} 
              startDate={trip.startDate} 
              endDate={trip.endDate} 
              activities={trip.activities || []}
            />
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