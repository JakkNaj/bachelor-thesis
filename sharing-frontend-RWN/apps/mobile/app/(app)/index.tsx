import { ETripFilter } from '@monorepo/shared/dist/types/ETripFilter';
import { Trip, TripInput } from '@monorepo/shared/src/api/generated/schemas';
import { useGetApiTrips } from '@monorepo/shared/src/api/generated/trips/trips';
import { CrossIcon } from '@monorepo/shared/src/assets/icons/CrossIcon';
import { PlusIcon } from '@monorepo/shared/src/assets/icons/PlusIcon';
import { Button } from '@monorepo/shared/src/components/Button';
import { TripCard } from '@monorepo/shared/src/components/TripCard';
import { useTripActions } from '@monorepo/shared/src/hooks/useTripActions';
import { colors, fontSizes, fontWeights, spacing } from '@monorepo/shared/src/theme';
import { createStyles } from '@monorepo/shared/src/utils/createStyles';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TripFilters } from '../components/TripFilters';
import { TripFormModal } from '../components/TripFormModal';

type TAppIndexStyles = {
	container: object;
	heroSection: object;
	heroContainer: object;
	heroContent: object;
	heroTitle: object;
	heroSubtitle: object;
	tripsHeaderContainer: object;
	tripsHeaderWithoutHero: object;
	tripsHeader: object;
	tripsTitle: object;
	tripsList: object;
	tripsGrid: object;
	loadingContainer: object;
	loadingText: object;
	emptyContainer: object;
	emptyTitle: object;
	emptySubtitle: object;
};

export const AppIndex = () => {
	const { data: trips, isLoading } = useGetApiTrips();
	const { createTrip, isCreating, createError } = useTripActions();
	const [showHero, setShowHero] = useState(true);
	const [activeFilter, setActiveFilter] = useState<ETripFilter>(ETripFilter.ALL);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const styles = useStyles();
	const router = useRouter();

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

	const handleCreateTrip = (data: TripInput) => {
		createTrip(data, () => setIsModalVisible(false));
	};

	const handleTripDetail = (id: number) => {
		router.push(`/trips/${id}` as any);
	};

	return (
		<View style={styles.container}>
			{/* Hero Section */}
			<View style={styles.heroSection}>
				{showHero && (
					<View style={styles.heroContainer}>
						<View style={styles.heroContent}>
							<View style={{ flex: 1, marginRight: spacing[4], marginBottom: spacing[2] }}>
								<Text style={styles.heroTitle}>Build your travel plans with ease!</Text>
								<Text style={styles.heroSubtitle}>
									Accessible and customizable trip planning system. Free.
								</Text>
								<Text style={[styles.heroSubtitle, { marginBottom: spacing[6] }]}>
									Made by travelers, for travelers.
								</Text>
								<Button variant="primary" onPress={() => setIsModalVisible(true)}>
									Get Started
								</Button>
							</View>
							<TouchableOpacity onPress={() => setShowHero(false)}>
								<CrossIcon size={24} color={colors.slate[400]} />
							</TouchableOpacity>
						</View>
					</View>
				)}

				{/* Your Trips Header */}
				<View style={[styles.tripsHeaderContainer, !showHero && styles.tripsHeaderWithoutHero]}>
					<View style={styles.tripsHeader}>
						<Text style={styles.tripsTitle}>Your Trips</Text>
						<Button
							variant="primary"
							icon={<PlusIcon size={16} color={colors.white} />}
							onPress={() => setIsModalVisible(true)}
						>
							Create a new trip
						</Button>
					</View>
				</View>

				{/* Trip Filters */}
				<TripFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
			</View>

			{/* Scrollable Trips List */}
			<ScrollView style={styles.tripsList} contentContainerStyle={styles.tripsGrid}>
				<View style={{ gap: spacing[4] }}>
					{isLoading ? (
						<View style={styles.loadingContainer}>
							<Text style={styles.loadingText}>Loading trips...</Text>
						</View>
					) : !filteredTrips?.length ? (
						<View style={styles.emptyContainer}>
							<Text style={styles.emptyTitle}>No trips found for this filter.</Text>
							<Text style={styles.emptySubtitle}>
								Try selecting a different filter or create a new trip.
							</Text>
							<Button variant="secondary" outlined onPress={() => setIsModalVisible(true)}>
								Create a new trip
							</Button>
						</View>
					) : (
						filteredTrips.map((trip: Trip) => (
							<TripCard
								key={trip.id}
								id={trip.id}
								title={trip.title}
								description={trip.description}
								startDate={trip.startDate}
								endDate={trip.endDate}
								activities={trip.activities || []}
								onPressDetail={handleTripDetail}
							/>
						))
					)}
				</View>
			</ScrollView>

			{/* Trip Form Modal */}
			<TripFormModal
				isVisible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				onSubmit={handleCreateTrip}
				isSubmitting={isCreating}
				submitError={createError as Error | null}
			/>
		</View>
	);
};

const useStyles = () => {
	return createStyles<TAppIndexStyles>(theme => ({
		container: {
			flex: 1,
			backgroundColor: colors.white,
		},
		heroSection: {
			backgroundColor: colors.white,
		},
		heroContainer: {
			padding: spacing[4],
		},
		heroContent: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'flex-start',
		},
		heroTitle: {
			fontSize: fontSizes['4xl'],
			fontWeight: fontWeights.bold,
			marginBottom: spacing[4],
		},
		heroSubtitle: {
			fontSize: fontSizes.lg,
			color: theme.colors.slate[600],
			marginBottom: spacing[2],
		},
		tripsHeaderContainer: {
			paddingHorizontal: spacing[4],
			marginBottom: spacing[4],
		},
		tripsHeaderWithoutHero: {
			marginTop: spacing[6],
		},
		tripsHeader: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		tripsTitle: {
			fontSize: fontSizes['4xl'],
			fontWeight: fontWeights.bold,
		},
		tripsList: {
			flex: 1,
			paddingHorizontal: spacing[4],
			paddingBottom: spacing[8],
			paddingTop: spacing[2],
			backgroundColor: theme.colors.slate[50],
		},
		tripsGrid: {
			gap: spacing[4],
		},
		loadingContainer: {
			height: 128,
			backgroundColor: theme.colors.slate[50],
			borderRadius: theme.radius.lg,
			borderWidth: 1,
			borderColor: theme.colors.slate[200],
			padding: spacing[4],
		},
		loadingText: {
			color: theme.colors.slate[400],
		},
		emptyContainer: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			paddingVertical: spacing[8],
		},
		emptyTitle: {
			fontSize: fontSizes.lg,
			color: theme.colors.slate[700],
			marginBottom: spacing[4],
		},
		emptySubtitle: {
			fontSize: fontSizes.base,
			color: theme.colors.slate[600],
			marginBottom: spacing[6],
		},
	}));
};

export default AppIndex;
