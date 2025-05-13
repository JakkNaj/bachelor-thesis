import { Trip } from "@/api/generated/schemas";
import { colors } from "@/assets/colors/colors";
import { Button } from "@/components/Button"
import { TripCard } from "@/components/TripCard";
import { Platform, View, Text, ScrollView, StyleSheet } from "react-native";

type TTripListSectionProps = {
    isLoading: boolean;
    filteredTrips: Trip[];
    handleTripDetail: (id: number) => void;
    onCreateTripClick: () => void;
}

export const TripListSection = ({ isLoading, filteredTrips, handleTripDetail, onCreateTripClick }: TTripListSectionProps) => {
    const renderContent = () => {
        return (
            <View style={[styles.tripsListContainer, Platform.OS === 'web' && styles.tripsListContainerWeb]}>
                <View style={styles.tripsList}>
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
                            <Button 
                                title="Create a new trip"
                                variant="secondary" 
                                outlined 
                                onPress={onCreateTripClick}
                                style={styles.emptyContainerButton}
                            />
                        </View>
                    ) : (
                        <View style={styles.tripsGrid}>
                            {filteredTrips.map((trip: Trip) => (
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
                            ))}
                        </View>
                    )}
                </View>
            </View>
        );
    };
    
    if (Platform.OS === 'web') {
        return renderContent();
    }

    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
            {renderContent()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    tripsListContainer: {
        flex: 1,
        marginTop: 8,
    },
    tripsList: {
        flex: 1,
    },
    tripsGrid: {
        flexDirection: 'column',
        gap: 16,
        paddingBottom: Platform.OS === 'web' ? 32 : 16,
    },
    loadingContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    loadingText: {
        fontSize: 16,
        color: colors.slate[500],
    },
    emptyContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: 32,
    },
    emptyContainerButton: {
        alignSelf: 'center',
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.slate[900],
    },
    emptySubtitle: {
        fontSize: 16,
        color: colors.slate[500],
        textAlign: 'center',
    },

    tripsListContainerWeb: {
        maxWidth: 980,
        width: '100%',
    },
});