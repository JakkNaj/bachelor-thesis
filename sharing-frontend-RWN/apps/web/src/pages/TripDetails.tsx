import { useGetApiTripsId } from '@monorepo/shared/src/api/generated/trips/trips';
import { BackIcon } from '@monorepo/shared/src/assets/icons/BackIcon';
import { Button } from '@monorepo/shared/src/components/Button';
import { useTripActions } from '@monorepo/shared/src/hooks/useTripActions';
import { breakpoints, colors, fontSizes, fontWeights, spacing } from '@monorepo/shared/src/theme';
import { formatDate } from '@monorepo/shared/src/utils/dateUtils';
import { TTripFormData } from '@monorepo/shared/src/yup';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { SidePanel } from '../components/SidePanel';
import { TripActivities } from '../components/TripActivities';
import { TripForm } from '../components/TripForm';

type TTripDetailsProps = {
	className?: string;
};

export const TripDetails = ({ className }: TTripDetailsProps) => {
	const { tripId } = useParams<{ tripId: string }>();
	const navigate = useNavigate();
	const [isEditingTrip, setIsEditingTrip] = useState(false);

	const { data: trip, isLoading, isError, error } = useGetApiTripsId(Number(tripId));
	const { updateTrip, deleteTrip, isUpdating, isDeleting, updateError } = useTripActions({
		tripId: Number(tripId),
	});

	const handleTripUpdateSubmit = (data: TTripFormData) => {
		updateTrip(data, () => {
			setIsEditingTrip(false);
		});
	};

	const handleDelete = () => {
		if (confirm('Are you sure you want to delete this trip? This action cannot be undone.')) {
			deleteTrip(() => {
				navigate('/');
			});
		}
	};

	if (isLoading) {
		return <LoadingContainer>Loading trip details...</LoadingContainer>;
	}

	if (isError || !trip) {
		return (
			<ErrorContainer>
				<ErrorTitle>Error loading trip</ErrorTitle>
				<ErrorMessage>
					{error instanceof Error ? error.message : 'Trip not found or an error occurred'}
				</ErrorMessage>
				<Button variant="primary" onPress={() => navigate('/')}>
					Back to Trips
				</Button>
			</ErrorContainer>
		);
	}

	return (
		<Container className={className}>
			<HeaderContainer>
				<BackLink to="/">
					<BackIcon size={20} />
					<BackLinkText>Back to Home</BackLinkText>
				</BackLink>
				<ButtonGroup>
					<Button variant="secondary" outlined onPress={() => setIsEditingTrip(true)}>
						Edit Trip
					</Button>
					<Button variant="danger" onPress={handleDelete} disabled={isDeleting}>
						{isDeleting ? 'Deleting...' : 'Delete Trip'}
					</Button>
				</ButtonGroup>
			</HeaderContainer>

			<TripHeader>
				<TripTitle>{trip.data.title}</TripTitle>
				<TripDates>
					{formatDate(trip.data.startDate)} - {formatDate(trip.data.endDate)}
				</TripDates>
				{trip.data.description && <TripDescription>{trip.data.description}</TripDescription>}
			</TripHeader>

			<TripActivities
				tripId={trip.data.id}
				activities={trip.data.activities || []}
				tripStartDate={trip.data.startDate}
				tripEndDate={trip.data.endDate}
			/>

			<SidePanel isOpen={isEditingTrip} onClose={() => setIsEditingTrip(false)}>
				<TripForm
					initialData={trip.data}
					onSubmit={handleTripUpdateSubmit}
					isSubmitting={isUpdating}
					submitError={updateError as Error}
				/>
			</SidePanel>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	gap: ${spacing[4]}px;
	max-width: 1536px;
	width: 100%;
	margin: 0 auto;
	height: 100%;
`;

const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${spacing[2]}px 0;
	flex-shrink: 0;

	@media (max-width: ${breakpoints.sm}px) {
		flex-direction: column;
		align-items: flex-start;
		gap: ${spacing[2]}px;
	}
`;

const BackLink = styled(Link)`
	display: inline-flex;
	align-items: center;
	gap: ${spacing[2]}px;
	color: ${colors.slate[600]};
	text-decoration: none;

	&:hover {
		color: ${colors.slate[900]};
	}
`;

const BackLinkText = styled.span`
	font-size: ${fontSizes.base}px;
`;

const ButtonGroup = styled.div`
	display: flex;
	gap: ${spacing[2]}px;
`;

const TripHeader = styled.section`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${spacing[2]}px;
	padding-bottom: ${spacing[4]}px;
	border-bottom: 2px dotted ${colors.slate[200]};
	flex-shrink: 0;
`;

const TripTitle = styled.h1`
	font-size: ${fontSizes['3xl']}px;
	font-weight: ${fontWeights.bold};
	line-height: 1.2;
	color: ${colors.slate[900]};
	word-break: break-word;
	margin: 0%;
`;

const TripDates = styled.p`
	font-size: ${fontSizes.lg}px;
	line-height: 1.5;
	font-weight: 300;
	color: ${colors.slate[900]};
	margin: 0;
	@media (max-width: ${breakpoints.sm}px) {
		font-size: ${fontSizes.base}px;
	}
`;

const TripDescription = styled.p`
	color: ${colors.slate[500]};
	font-size: ${fontSizes.base}px;
	line-height: 1.5;
	font-weight: 200;
	word-break: break-word;
	margin: 0;
`;

const LoadingContainer = styled.div`
	text-align: center;
	padding: ${spacing[8]}px 0;
	max-width: 1536px;
	width: 100%;
	margin: 0 auto;
`;

const ErrorContainer = styled.div`
	text-align: center;
	padding: ${spacing[8]}px 0;
	max-width: 1536px;
	width: 100%;
	margin: 0 auto;
`;

const ErrorTitle = styled.h2`
	font-size: ${fontSizes.xl}px;
	font-weight: ${fontWeights.semibold};
	color: ${colors.red[600]};
`;

const ErrorMessage = styled.p`
	color: ${colors.slate[600]};
	margin-top: ${spacing[2]}px;
`;
