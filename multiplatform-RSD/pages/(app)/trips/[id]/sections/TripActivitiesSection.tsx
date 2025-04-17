import { Activity } from "@/api/generated/schemas";
import { ActivityStepper } from "@/components/ActivityStepper";
import { Button } from "@/components/Button";
import { PlusIcon } from "@/assets/icons/PlusIcon/PlusIcon";
import { colors } from "@/assets/colors/colors";
import { css, html } from "react-strict-dom";
import { useState } from "react";
import { FormModal } from "@/components/FormModal/FormModal";
import { ActivityForm } from "@/components/ActivityForm";
import { ActivityInput } from "@/api/generated/schemas";
import { useActivityActions } from "@/hooks/useActivityActions";

type TTripActivitiesSectionProps = {
    tripId: number;
    tripDates: {
        startDate: string;
        endDate: string;
    };
    activities: Activity[];
}

export const TripActivitiesSection = ({ activities, tripId, tripDates }: TTripActivitiesSectionProps) => {
    const [isAddActivityModalVisible, setIsAddActivityModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<Error | null>(null);
    const { createActivity, createError } = useActivityActions({ tripId });

    const handleOpenModal = () => {
        setIsAddActivityModalVisible(true);
        setSubmitError(null);
    };

    const handleCloseModal = () => {
        setIsAddActivityModalVisible(false);
        setSubmitError(null);
    };

    const handleSubmit = async (data: ActivityInput) => {
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            createActivity(data, () => {
                handleCloseModal();
            });
        } catch (error) {
            setSubmitError(error instanceof Error ? error : new Error('Failed to create activity'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <html.div style={styles.container}>
            {/* Header */}
            <html.div style={styles.header}>
                <html.h2 style={styles.title()}>Activities</html.h2>
                <Button 
                    variant="primary"
                    icon={<PlusIcon size={16} color="#ffffff" />}
                    onPress={handleOpenModal}
                    title="Add Activity"
                />
                {createError && (
                    <html.p style={styles.error()}>{createError.message}</html.p>
                )}
            </html.div>

            {/* Content */}
            {activities.length > 0 ? (
                <ActivityStepper 
                    activities={activities} 
                    tripId={tripId} 
                    tripDates={tripDates} 
                />
            ) : (
                <html.div style={styles.emptyState}>
                    <html.p style={styles.emptyStateTitle()}>No activities added yet.</html.p>
                    <html.p style={styles.emptyStateSubtitle()}>Start by adding your first activity.</html.p>
                    <Button 
                        variant="secondary" 
                        outlined 
                        style={styles.emptyStateButton}
                        onPress={handleOpenModal}
                        title="Add your first activity"
                    />
                </html.div>
            )}

            {/* Activity Form Modal */}
            <FormModal
                isVisible={isAddActivityModalVisible}
                onClose={handleCloseModal}
                title="Add New Activity"
            >
                <ActivityForm
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    submitError={submitError}
                    tripStartDate={tripDates.startDate}
                    tripEndDate={tripDates.endDate}
                />
            </FormModal>
        </html.div>
    );
};

const styles = css.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginTop: '1rem',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: () => ({
        fontSize: '1.5rem',
        fontWeight: '700',
        color: colors.slate[900],
        margin: 0,
    }),
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '2rem',
        paddingBottom: '2rem',
    },
    emptyStateTitle: () => ({
        fontSize: '1.125rem',
        color: colors.slate[700],
        marginBottom: '1rem',
        margin: 0,
    }),
    emptyStateSubtitle: () => ({
        fontSize: '1rem',
        color: colors.slate[600],
        marginBottom: '1.5rem',
        margin: 0,
    }),
    emptyStateButton: {
        alignSelf: 'center',
    },
    error: () => ({
        color: colors.red[500],
        marginTop: '1rem',
    }),
});