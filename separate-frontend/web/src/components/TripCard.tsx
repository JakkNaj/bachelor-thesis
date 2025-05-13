import { Activity } from "../api/generated/schemas/activity";
import { Button } from "./Button";
import { EyeIcon } from "../assets/icons/EyeIcon";
import { useNavigate } from "react-router-dom";

type TTripCardProps = {
	id: number;
	title: string;
	description?: string;
	startDate: string;
	endDate: string;
	activities: Activity[];
};

const getRandomActivities = (activities: Activity[]) => {
	const shuffled = activities.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, 2);
};

export const TripCard = ({ id, title, description, startDate, endDate, activities }: TTripCardProps) => {
	const navigate = useNavigate();

	const displayedActivities = getRandomActivities(activities);
	const hasMoreActivities = activities.length > 2;

	return (
		<div className="border border-slate-200 p-4 pb-4 mb-4 rounded-lg flex justify-between">
			<div className="trip-info flex-1">
				<div className="flex flex-col sm:flex-row justify-start items-start gap-2">
					<h3 className="font-semibold text-slate-900 text-base leading-6 sm:text-left">{title}</h3>
					<p className="text-slate-900 text-sm leading-5">
						{new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
					</p>
				</div>
				{description && <p className="text-slate-500 text-sm leading-5 mt-1">{description}</p>}
				<div className="activities-info mt-2">
					{displayedActivities.length > 0 ? (
						<ul className="list-disc pl-4">
							{displayedActivities.map((activity) => (
								<li key={activity.id} className="text-slate-700 text-sm leading-5">
									{activity.title}
								</li>
							))}
							{hasMoreActivities && <li className="text-slate-500 text-sm leading-5">..and much more</li>}
						</ul>
					) : (
						<p className="text-slate-500 text-sm leading-5">No activities added yet.</p>
					)}
				</div>
			</div>
			<div className="flex flex-col items-end justify-end">
				<Button
					variant="secondary"
					className="mt-2"
					icon={<EyeIcon />}
					onClick={() => {
						navigate(`/trips/${id}`);
					}}
				>
					View Trip
				</Button>
			</div>
		</div>
	);
};
