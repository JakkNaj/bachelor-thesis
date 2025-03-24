import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ActivityInput } from '../api/generated/schemas';
import { Button } from './Button';
import { PlusIcon } from '../assets/icons/PlusIcon';
import { formatDate, formatTime } from '../utils/dateUtils';
import { SidePanel } from './SidePanel';
import { ActivityForm } from './ActivityForm';
import { usePostApiActivitiesTripTripId } from '../api/generated/activities/activities';

type TTripActivitiesProps = {
  tripId: number;
  activities: Activity[];
  tripStartDate: string;
  tripEndDate: string;
  onActivityAdded: () => void;
};

export const TripActivities = ({ 
  tripId, 
  activities,
  tripStartDate,
  tripEndDate,
  onActivityAdded 
}: TTripActivitiesProps) => {
  const [isAddingActivity, setIsAddingActivity] = useState(false);

  const { mutate: createActivity, isPending } = usePostApiActivitiesTripTripId({
    mutation: {
      onSuccess: () => {
        setIsAddingActivity(false);
        onActivityAdded();
      }
    }
  });

  const handleSubmit = (data: ActivityInput) => {
    createActivity({ tripId, data });
  };

  return (
    <>
      <section className="mx-auto flex max-w-[1536px] flex-col justify-center items-center gap-[4px] pb-[10px] pt-[16px]">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-2xl font-bold leading-tight tracking-tighter">Activities</h2>
          <Button 
            variant="primary" 
            icon={<PlusIcon className="w-4 h-4" />}
            onClick={() => setIsAddingActivity(true)}
          >
            Add Activity
          </Button>
        </div>
      </section>

      <section className="container py-2">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4">
          <div className="w-full">
            {activities && activities.length > 0 ? (
              <div className="space-y-4">
                {activities
                  .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                  .map((activity) => (
                    <div 
                      key={activity.id} 
                      className="border border-slate-200 p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{activity.title}</h3>
                          <p className="text-slate-600 text-sm">
                            {formatTime(activity.startTime)}
                            {activity.endTime && ` - ${formatTime(activity.endTime)}`}
                            {"  " + formatDate(activity.startTime)}
                          </p>
                          {activity.description && (
                            <p className="text-slate-700 mt-2">
                              {activity.description}
                            </p>
                          )}
                        </div>
                        <Link to={`/trips/${tripId}/activities/${activity.id}/edit`}>
                          <Button variant="secondary">Edit</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-600 text-lg">No activities planned yet.</p>
                <p className="text-slate-600 text-sm mt-2">
                  Start by adding your first activity to this trip.
                </p>
                <Button 
                  variant="primary" 
                  className="mt-4"
                  onClick={() => setIsAddingActivity(true)}
                >
                  Add First Activity
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <SidePanel 
        isOpen={isAddingActivity} 
        onClose={() => setIsAddingActivity(false)}
      >
        <h2 className="text-2xl font-bold mb-6">Add New Activity</h2>
        <ActivityForm
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          tripStartDate={tripStartDate}
          tripEndDate={tripEndDate}
        />
      </SidePanel>
    </>
  );
}; 