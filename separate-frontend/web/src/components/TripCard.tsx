import { Activity } from "../api/generated/schemas/activity";
import { Button } from "./Button";

type TTripCardProps = {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  activities: Activity[];
};

export const TripCard = ({ title, description, startDate, endDate, activities }: TTripCardProps) => {
  // Function to get two random activities
  const getRandomActivities = (activities: Activity[]) => {
    const shuffled = activities.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  const displayedActivities = getRandomActivities(activities);
  const hasMoreActivities = activities.length > 2;

  return (
    <div className="border border-slate-200 p-4 pb-4 mb-4 rounded-lg flex justify-between">
      <div className="trip-info flex-1">
        <div className="flex justify-start items-center gap-4">
          <h3 className="font-semibold text-slate-900 text-base leading-6">
            {title}
          </h3>
          <p className="text-slate-900 text-sm leading-5">
            {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
          </p>
        </div>
        {description && (
          <p className="text-slate-500 text-sm leading-5 mt-1">
            {description}
          </p>
        )}
        <div className="activities-info mt-2">
          {displayedActivities.length > 0 ? (
            <ul className="list-disc pl-4">
              {displayedActivities.map((activity) => (
                <li key={activity.id} className="text-slate-700 text-sm leading-5">
                  {activity.title}
                </li>
              ))}
              {hasMoreActivities && (
                <li className="text-slate-500 text-sm leading-5">..and much more</li>
              )}
            </ul>
          ) : (
            <p className="text-slate-500 text-sm leading-5">No activities added yet.</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end justify-end">
        <Button variant="secondary" className="mt-2" icon={
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1" width="16" height="16">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M9 4.45962C9.91153 4.16968 10.9104 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C3.75612 8.07914 4.32973 7.43025 5 6.82137" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path>
              <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#1C274C" stroke-width="1.5"></path>
            </g>
          </svg>
        }>
          View Trip
        </Button>
      </div>
    </div>
  );
};