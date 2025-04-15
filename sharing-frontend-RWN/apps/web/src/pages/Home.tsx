import { Trip, TripInput } from '@monorepo/shared/src/api/generated/schemas';
import { useGetApiTrips } from '@monorepo/shared/src/api/generated/trips/trips';
import { Button } from '@monorepo/shared/src/components/Button';
import { TripCard } from '@monorepo/shared/src/components/TripCard';
import { useTripActions } from '@monorepo/shared/src/hooks/useTripActions';
import { colors, fontSizes, fontWeights, spacing } from '@monorepo/shared/src/theme';
import { ETripFilter } from '@monorepo/shared/src/types/ETripFilter';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SidePanel } from '../components/SidePanel';
import { TripFilters } from '../components/TripFilters';
import { TripForm } from '../components/TripForm';

export const Home = () => {
	const navigate = useNavigate();
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
				return trips.data.filter((trip: Trip) => new Date(trip.startDate) >= today);
			case ETripFilter.PAST:
				return trips.data.filter((trip: Trip) => new Date(trip.startDate) < today);
			default:
				return trips.data;
		}
	}, [trips, activeFilter]);

	return (
		<Container>
			<HeroSection>
				<HeroContent>
					<HeroTitle>Build your travel plans with ease!</HeroTitle>
					<HeroDescription>
						Accessible and customizable trip planning system. Free.
						<br />
						Made by travelers, for travelers.
					</HeroDescription>
					<ButtonContainer>
						<Button variant="primary" onPress={() => setIsFormOpen(true)}>
							Get Started
						</Button>
					</ButtonContainer>
				</HeroContent>
			</HeroSection>

			<TripsSection>
				<HeaderContainer>
					<HeaderTitle>Your Trips</HeaderTitle>
					<HeaderButton>
						<Button variant="primary" onPress={() => setIsFormOpen(true)}>
							Create a new trip
						</Button>
					</HeaderButton>
				</HeaderContainer>
				<TripFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
			</TripsSection>

			<ContentSection>
				<TripsContainer>
					{filteredTrips.length === 0 ? (
						<EmptyState>
							<EmptyStateText>No trips found for this filter.</EmptyStateText>
							<EmptyStateSubtext>
								Try selecting a different filter or create a new trip.
							</EmptyStateSubtext>
							<Button variant="primary" onPress={() => setIsFormOpen(true)}>
								Create a new trip
							</Button>
						</EmptyState>
					) : (
						filteredTrips.map(trip => (
							<TripCard
								key={trip.id}
								id={trip.id}
								title={trip.title}
								description={trip.description}
								startDate={trip.startDate}
								endDate={trip.endDate}
								activities={trip.activities || []}
								onPressDetail={id => navigate(`/trips/${id}`)}
							/>
						))
					)}
				</TripsContainer>
			</ContentSection>

			<SidePanel isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
				<FormHeader>
					<FormTitle>New Trip</FormTitle>
				</FormHeader>
				<TripForm
					onSubmit={handleCreateTrip}
					isSubmitting={isCreating}
					submitError={createError as Error}
				/>
			</SidePanel>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const HeroSection = styled.section`
	border-bottom: 2px dotted ${colors.slate[200]};
`;

const HeroContent = styled.div`
	max-width: 1536px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: ${spacing[1]}px 0;
	margin-bottom: ${spacing[3]}px;
`;

const HeroTitle = styled.h1`
	font-size: ${fontSizes['4xl']}px;
	font-weight: ${fontWeights.bold};
	line-height: 40px;
	color: ${colors.black};
	text-align: start;
	margin-bottom: ${spacing[3]}px;

	@media (max-width: 768px) {
		font-size: ${fontSizes['3xl']}px;
	}
`;

const HeroDescription = styled.p`
	max-width: 750px;
	margin-top: 0;
	text-align: start;
	font-size: ${fontSizes.lg}px;
	line-height: 28px;
	font-weight: ${fontWeights.normal};
	color: ${colors.slate[600]};
	margin-bottom: ${spacing[2]}px;
`;

const ButtonContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: flex-start;
	gap: ${spacing[4]}px;
	padding-top: ${spacing[2]}px;
`;

const TripsSection = styled.section`
	max-width: 1536px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: ${spacing[1]}px;
	padding: ${spacing[2]}px 0 ${spacing[3]}px;
`;

const HeaderContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	align-items: center;
	padding: 0 ${spacing[2]}px;
	gap: 10rem;

	@media (max-width: 768px) {
		gap: ${spacing[4]}px;
		grid-template-columns: auto 1fr;
		align-items: center;
		margin-top: ${spacing[2]}px;
	}
`;

const HeaderTitle = styled.h2`
	font-size: ${fontSizes['4xl']}px;
	font-weight: ${fontWeights.bold};
	line-height: 1.2;
	text-align: center;
	grid-column: 2;
	margin-bottom: 0;

	@media (max-width: 768px) {
		grid-column: 1;
		text-align: start;
		margin-top: 0;
	}
`;

const HeaderButton = styled.div`
	grid-column: 3;
	justify-self: end;

	@media (max-width: 768px) {
		grid-column: 2;
		justify-self: center;
	}
`;

const ContentSection = styled.section`
	padding: 0 ${spacing[2]}px;
`;

const TripsContainer = styled.div`
	max-width: 980px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${spacing[4]}px;
	margin-bottom: 4rem;
`;

const EmptyState = styled.div`
	text-align: center;
	padding: ${spacing[8]}px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${spacing[4]}px;
`;

const EmptyStateText = styled.p`
	color: ${colors.slate[600]};
	font-size: ${fontSizes.lg}px;
`;

const EmptyStateSubtext = styled.p`
	color: ${colors.slate[600]};
	font-size: ${fontSizes.sm}px;
	margin-top: ${spacing[2]}px;
`;

const FormHeader = styled.div`
	margin-bottom: ${spacing[6]}px;
`;

const FormTitle = styled.h2`
	font-size: ${fontSizes['2xl']}px;
	font-weight: ${fontWeights.semibold};
`;
