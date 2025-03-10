import { useNavigate } from 'react-router-dom';
import { TripForm } from '../components/TripForm';
import { usePostApiTrips } from '../api/generated/trips/trips';
import { TripInput, Trip } from '../api/generated/schemas';

export const NewTrip = () => {
  const navigate = useNavigate();
  
  const { mutate: createTrip, isPending, error } = usePostApiTrips({
    mutation: {
      onSuccess: (data: Trip) => {
        navigate(`/trips/${data.id}`);
      }
    }
  });
  
  const handleSubmit = (data: TripInput) => {
    createTrip({ data });
  };
  
  return (
    <div className="new-trip-container">
      <h1>Plan a New Trip</h1>
      <TripForm
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        submitError={error as Error}
      />
    </div>
  );
}; 