import { useParams, useNavigate } from 'react-router-dom';
import { ActivityForm } from '../components/ActivityForm';
import { useGetApiTripsId } from '../api/generated/trips/trips';
import { usePostApiActivitiesTripTripId } from '../api/generated/activities/activities';
import { ActivityInput } from '../api/generated/schemas';

export const NewActivity = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  
  const { data: trip, isLoading: tripLoading, isError: tripError } = useGetApiTripsId(Number(tripId) || 0);
  
  const { mutate: createActivity, isPending, error } = usePostApiActivitiesTripTripId({
    mutation: {
      onSuccess: () => {
        navigate(`/trips/${tripId}`);
      }
    }
  });
  
  const handleSubmit = (data: ActivityInput) => {
    if (tripId) {
      createActivity({ tripId: Number(tripId), data });
    }
  };
  
  if (tripLoading) {
    return <div>Loading trip details...</div>;
  }
  
  if (tripError || !trip) {
    return <div>Error loading trip details</div>;
  }
  
  return (
    <div className="new-activity-container">
      <h1>Add Activity to {trip.title}</h1>
      <ActivityForm
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        submitError={error as Error}
        tripStartDate={trip.startDate}
        tripEndDate={trip.endDate}
      />
    </div>
  );
}; 