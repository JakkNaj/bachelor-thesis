import { useParams, useNavigate } from 'react-router-dom';
import { TripForm } from '../components/TripForm';
import { useGetApiTripsId, usePutApiTripsId } from '../api/generated/trips/trips';
import { TripInput, Trip } from '../api/generated/schemas';

export const EditTrip = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  
  const { data: trip, isLoading, isError, error } = useGetApiTripsId(Number(tripId) || 0);
  
  const { mutate: updateTrip, isPending: isUpdating, error: updateError } = usePutApiTripsId({
    mutation: {
      onSuccess: (data: Trip) => {
        navigate(`/trips/${data.id}`);
      }
    }
  });
  
  const handleSubmit = (data: TripInput) => {
    if (tripId) {
      updateTrip({ id: Number(tripId), data });
    }
  };
  
  if (isLoading) {
    return <div>Loading trip details...</div>;
  }
  
  if (isError || !trip) {
    return (
      <div className="error-container">
        <h2>Error loading trip</h2>
        <p>{typeof error === 'object' && error !== null ? String(error) : 'Trip not found or an error occurred'}</p>
        <button onClick={() => navigate('/trips')} className="btn btn-primary">
          Back to Trips
        </button>
      </div>
    );
  }
  
  return (
    <div className="edit-trip-container">
      <h1>Edit Trip</h1>
      <TripForm
        initialData={trip}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        submitError={updateError as Error}
      />
    </div>
  );
}; 