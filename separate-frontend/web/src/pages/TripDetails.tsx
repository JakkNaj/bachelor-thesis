import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetApiTripsId, useDeleteApiTripsId, usePutApiTripsId, getGetApiTripsQueryKey } from "../api/generated/trips/trips";
import { Button } from "../components/Button";
import { BackIcon } from "../assets/icons/BackIcon";
import { formatDate } from "../utils/dateUtils";
import { TripActivities } from "../components/TripActivities";
import { useState } from "react";
import { SidePanel } from "../components/SidePanel";
import { TripForm } from "../components/TripForm";
import { TTripFormData } from "../types/tripFormSchema";
import { useQueryClient } from "@tanstack/react-query";

type TTripDetailsProps = {
	className?: string;
};

export const TripDetails = ({ className }: TTripDetailsProps) => {
	const { tripId } = useParams<{ tripId: string }>();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [isEditingTrip, setIsEditingTrip] = useState(false);

	const { data: trip, isLoading, isError, error, refetch } = useGetApiTripsId(Number(tripId));

	const {
		mutate: updateTrip,
		isPending: isUpdating,
		error: updateError,
	} = usePutApiTripsId({
		mutation: {
			onSuccess: () => {
				setIsEditingTrip(false);
				refetch();
			},
		},
	});

	const handleTripUpdateSubmit = (data: TTripFormData) => {
		if (!trip) return;
		updateTrip({ id: trip.id, data });
	};

	const { mutate: deleteTrip, isPending: isDeleting } = useDeleteApiTripsId({
		mutation: {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: getGetApiTripsQueryKey() });
				navigate("/");
			},
		},
	});

	if (isLoading) {
		return <div className="text-center py-8">Loading trip details...</div>;
	}

	if (isError || !trip) {
		return (
			<div className="text-center py-8">
				<h2 className="text-xl font-semibold text-red-600">Error loading trip</h2>
				<p className="text-slate-600 mt-2">{error instanceof Error ? error.message : "Trip not found or an error occurred"}</p>
				<Link to="/" className="mt-4 inline-block">
					<Button variant="primary">Back to Trips</Button>
				</Link>
			</div>
		);
	}

	const handleDelete = () => {
		if (confirm("Are you sure you want to delete this trip? This action cannot be undone.")) {
			deleteTrip({ id: trip.id });
		}
	};

	return (
		<div className={className}>
			<div className="flex justify-between items-center mt-4 mb-2">
				<Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900">
					<BackIcon className="w-5 h-5" />
					<span>Back to Home</span>
				</Link>
				<div className="flex gap-2">
					<Button variant="secondary" outlined onClick={() => setIsEditingTrip(true)}>
						Edit Trip
					</Button>
					<Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
						{isDeleting ? "Deleting..." : "Delete Trip"}
					</Button>
				</div>
			</div>

			<section className="mx-auto flex max-w-[1536px] flex-col items-start gap-[4px] py-[20px] border-b-2 border-dotted border-slate-200">
				<h1 className="text-[36px] font-[700] leading-[40px] text-[rgb(9,9,11)]">{trip.title}</h1>
				<p className="text-[18px] leading-[28px] font-[300] text-[rgb(9,9,11)]">
					{formatDate(trip.startDate)} - {formatDate(trip.endDate)}
				</p>
				{trip.description && <p className="text-[rgb(113, 113, 122)] text-[15px] leading-[28px] font-[200]">{trip.description}</p>}
			</section>

			<TripActivities
				tripId={trip.id}
				activities={trip.activities || []}
				tripStartDate={trip.startDate}
				tripEndDate={trip.endDate}
				onActivityAdded={() => {
					refetch();
				}}
				onActivityUpdated={() => {
					refetch();
				}}
			/>

			<SidePanel isOpen={isEditingTrip} onClose={() => setIsEditingTrip(false)}>
				<TripForm
					initialData={trip}
					onSubmit={handleTripUpdateSubmit}
					isSubmitting={isUpdating}
					submitError={updateError as Error}
				/>
			</SidePanel>
		</div>
	);
};
