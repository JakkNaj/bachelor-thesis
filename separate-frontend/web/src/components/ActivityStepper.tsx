import { Activity } from '../api/generated/schemas';
import { formatDate, formatTime } from '../utils/dateUtils';
import { Button } from './Button';
import { Link } from 'react-router-dom';

type TActivityStepperProps = {
  activities: Activity[];
  tripId: number;
};

export const ActivityStepper = ({ activities, tripId }: TActivityStepperProps) => {
  const sortedActivities = activities.sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  return (
    <div className="relative z-0">
      {/* Continuous vertical line behind all steps - stops before last step */}
      <div 
        className="absolute left-4 top-4 w-0.5 bg-slate-300" 
        style={{ 
          height: `calc(100% - ${sortedActivities.length > 0 ? 100 : 0}px)`
        }} 
      />

      {sortedActivities.map((activity, index) => (
        <div key={activity.id} className="flex gap-4 mb-8 last:mb-0">
          {/* Number circle */}
          <div className="relative z-10">
            <div className="flex h-8 w-8 items-center justify-center rounded-full text-[#090909] mt-1 border border-slate-300 bg-white">
              {index + 1}
            </div>
          </div>

          {/* Activity content */}
          <div className="flex-1 rounded-lg border border-slate-200 p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg leading-tight">{activity.title}</h3>
                <p className="text-slate-600 text-sm mt-1">
                  {activity.endTime 
                    ? `${formatTime(activity.startTime)} - ${formatTime(activity.endTime)}`
                    : formatTime(activity.startTime)
                  } {formatDate(activity.startTime)}
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
        </div>
      ))}
    </div>
  );
}; 