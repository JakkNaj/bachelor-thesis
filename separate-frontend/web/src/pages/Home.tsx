import { useGetApiTrips } from "../api/generated/trips/trips";
import { Button } from "../components/Button";
import { TripFilters } from "../components/TripFilters";
import { useState, useMemo } from "react";
import { ETripFilter } from "../types/trips";
import { TripCard } from "../components/TripCard";
import { TripForm } from "../components/TripForm";
import { TripInput } from "../api/generated/schemas";
import { SidePanel } from "../components/SidePanel";
import { useTripActions } from "../hooks/useTripActions";

type THomeProps = {
	className?: string;
};

export const Home = ({ className }: THomeProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const { data: trips } = useGetApiTrips();
	const [activeFilter, setActiveFilter] = useState<ETripFilter>(ETripFilter.ALL);
	const { createTrip, isCreating, createError } = useTripActions();

	const handleCreateTrip = (data: TripInput) => {
		createTrip(data, () => {
			setIsFormOpen(false);
		});
	};

	const filteredTrips = useMemo(() => {
		if (!trips) return [];
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		switch (activeFilter) {
			case ETripFilter.UPCOMING:
				return trips.filter((trip) => new Date(trip.startDate) >= today);
			case ETripFilter.PAST:
				return trips.filter((trip) => new Date(trip.startDate) < today);
			default:
				return trips;
		}
	}, [trips, activeFilter]);

	return (
		<div className={className}>
			<section className="mx-auto flex max-w-[1536px] flex-col items-start gap-[4px] py-[20px] border-b-2 border-dotted border-slate-200">
				<h1 className="text-start text-[36px] font-[700] leading-[40px] text-[rgb(9,9,11)]">Build your travel plans with ease!</h1>
				<p className="max-w-[750px] text-start text-[18px] leading-[28px] font-[300] text-[rgb(9,9,11)]">
					Accessible and customizable trip planning system. Free.
					<br />
					Made by travelers, for travelers.
				</p>
				<div className="flex w-full items-center justify-start space-x-4 pt-[8px]">
					<Button variant="primary" onClick={() => setIsFormOpen(true)}>
						Get Started
					</Button>
				</div>
			</section>

			<section className="mx-auto flex max-w-[1536px] flex-col justify-center items-center gap-[4px] pb-[10px] pt-[16px]">
				<div className="flex flex-row items-center w-full relative">
					<h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-center md:flex-1">Your Trips</h2>
					<div className="ml-auto md:ml-0">
						<Button variant="primary" onClick={() => setIsFormOpen(true)}>
							Create a new trip
						</Button>
					</div>
				</div>
				<TripFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
			</section>

			<section className="mx-auto w-full px-4 py-2">
				<div className="mx-auto flex max-w-[980px] flex-col items-center gap-4">
					<div className="w-full">
						{filteredTrips.length === 0 ? (
							<div className="text-center py-8 flex flex-col items-center gap-4">
								<p className="text-slate-600 text-lg">No trips found for this filter.</p>
								<p className="text-slate-600 text-sm mt-2">Try selecting a different filter or create a new trip.</p>
								<Button variant="primary" onClick={() => setIsFormOpen(true)}>
									Create a new trip
								</Button>
							</div>
						) : (
							filteredTrips.map((trip) => (
								<TripCard
									key={trip.id}
									id={trip.id}
									title={trip.title}
									description={trip.description}
									startDate={trip.startDate}
									endDate={trip.endDate}
									activities={trip.activities || []}
								/>
							))
						)}
					</div>
				</div>
			</section>

			<SidePanel isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
				<div className="mb-6">
					<h2 className="text-2xl font-semibold">New Trip</h2>
				</div>
				<TripForm onSubmit={handleCreateTrip} isSubmitting={isCreating} submitError={createError as Error} />
			</SidePanel>
		</div>
	);
};
