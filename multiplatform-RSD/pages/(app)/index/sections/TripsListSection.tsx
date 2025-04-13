import { Trip } from "@/api/generated/schemas";
import { colors } from "@/assets/colors/colors";
import { Button } from "@/components/Button"
import { TripCard } from "@/components/TripCard";
import { Platform } from "react-native"
import { ScrollView } from "react-native";
import { css, html } from "react-strict-dom"

type tripsListSectionProps = {
    isLoading: boolean;
    filteredTrips: Trip[];
    handleTripDetail: (id: number) => void;
}

export const TripsListSection = ({ isLoading, filteredTrips, handleTripDetail }: tripsListSectionProps) => {
    const renderContent = () => {
        return (
            <html.div style={[styles.tripsListContainer, Platform.OS === 'web' && webStyles.tripsListContainer]}>
                    <html.div style={styles.tripsList}>
                        {isLoading ? (
                            <html.div style={styles.loadingContainer}>
                                <html.p style={styles.loadingText()}>Loading trips...</html.p>
                            </html.div>
                        ) : !filteredTrips?.length ? (
                            <html.div style={styles.emptyContainer}>
                                <html.h3 style={styles.emptyTitle()}>No trips found for this filter.</html.h3>
                                <html.p style={styles.emptySubtitle()}>
                                    Try selecting a different filter or create a new trip.
                                </html.p>
                                <Button 
                                    title="Create a new trip"
                                    variant="secondary" 
                                    outlined 
                                    onPress={() => {}}
                                    style={styles.emptyContainerButton}
                                />
                            </html.div>
                        ) : (
                            <html.div style={styles.tripsGrid}>
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
                            </html.div>
                        )}
                    </html.div>
                </html.div>
        )
    }
    
    if (Platform.OS === 'web') {
        return renderContent();
    }

    return (
        <ScrollView>
            {renderContent()}
        </ScrollView>
    )
}

const styles = css.create({
    tripsListContainer: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    tripsList: {
        display: 'flex',
        flexDirection: 'column',
    },
    tripsGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
    },
    loadingText: () => ({
        fontSize: '1rem',
        color: colors.slate[500],
    }),
    emptyContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '2rem',
    },
    emptyContainerButton: {
        alignSelf: 'center',
    },
    emptyTitle: () => ({
        fontSize: '1.25rem',
        fontWeight: '600',
        color: colors.slate[900],
        margin: '0',
    }),
    emptySubtitle: () => ({
        fontSize: '1rem',
        color: colors.slate[500],
        textAlign: 'center',
        margin: '0',
    }),
});

const webStyles = css.create({
    tripsListContainer: {
        maxWidth: '980px',
        width: '100%',
    },
});