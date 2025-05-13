import { Activity } from "@/api/generated/schemas";
import { ActivityStepper } from "@/components/ActivityStepper";
import { Button } from "@/components/Button";
import { PlusIcon } from "@/assets/icons/PlusIcon";
import { colors } from "@/assets/colors/colors";
import { Platform, View, Text, StyleSheet } from "react-native";

type TTripActivitiesSectionProps = {
    tripId: number;
    tripDates: {
        startDate: string;
        endDate: string;
    };
    activities: Activity[];
    onAddActivityClick: () => void;
}

export const TripActivitiesSection = ({ 
    activities, 
    tripId, 
    tripDates,
    onAddActivityClick,
}: TTripActivitiesSectionProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Activities</Text>
                <Button 
                    variant="primary"
                    icon={<PlusIcon size={16} color="#ffffff" />}
                    onPress={onAddActivityClick}
                    title="Add Activity"
                />
            </View>

            {activities.length > 0 ? (
                <ActivityStepper 
                    activities={activities} 
                    tripId={tripId} 
                    tripDates={tripDates} 
                />
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateTitle}>No activities added yet.</Text>
                    <Text style={styles.emptyStateSubtitle}>Start by adding your first activity.</Text>
                    <Button 
                        variant="secondary" 
                        outlined 
                        style={styles.emptyStateButton}
                        onPress={onAddActivityClick}
                        title="Add your first activity"
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        marginTop: 16,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.slate[900],
        margin: 0,
        textAlign: 'left',
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 32,
        paddingBottom: 32,
    },
    emptyStateTitle: {
        fontSize: 18,
        color: colors.slate[700],
        marginBottom: 16,
        margin: 0,
    },
    emptyStateSubtitle: {
        fontSize: 16,
        color: colors.slate[600],
        marginBottom: 24,
        margin: 0,
    },
    emptyStateButton: {
        alignSelf: 'center',
    },
});