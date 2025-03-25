import { useState } from 'react';
import { Activity } from '../api/generated/schemas';
import { Button } from './Button';
import { PlusIcon } from '../assets/icons/PlusIcon';
import { SidePanel } from './SidePanel';
import { ActivityForm } from './ActivityForm';
import { usePostApiActivitiesTripTripId } from '../api/generated/activities/activities';
import { TActivityFormData } from '../types/activityFormSchema';
import { ActivityStepper } from './ActivityStepper';

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

  const handleSubmit = (data: TActivityFormData) => {
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
        <div className="mx-auto max-w-[980px]">
          {activities && activities.length > 0 ? (
            <ActivityStepper activities={activities} tripId={tripId} />
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