import { Activity, ActivityInput } from '@monorepo/shared/src/api/generated/schemas';
import { PlusIcon } from '@monorepo/shared/src/assets/icons/PlusIcon';
import { ActivityStepper } from '@monorepo/shared/src/components/ActivityStepper';
import { Button } from '@monorepo/shared/src/components/Button';
import { useActivityActions } from '@monorepo/shared/src/hooks/useActivityActions';
import { colors, fontSizes, fontWeights, spacing } from '@monorepo/shared/src/theme';
import { useState } from 'react';
import styled from 'styled-components';
import { ActivityForm } from './ActivityForm';
import { SidePanel } from './SidePanel';

type TTripActivitiesProps = {
	tripId: number;
	activities: Activity[];
	tripStartDate: string;
	tripEndDate: string;
	onActivityAdded: () => void;
	onActivityUpdated: () => void;
};

export const TripActivities = ({
	tripId,
	activities,
	tripStartDate,
	tripEndDate,
	onActivityAdded,
	onActivityUpdated,
}: TTripActivitiesProps) => {
	const [isAddingActivity, setIsAddingActivity] = useState(false);
	const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
	const { createActivity, updateActivity, isCreating, isUpdating, createError, updateError } =
		useActivityActions({
			tripId,
			activityId: editingActivity?.id,
		});

	const handleSubmit = (data: ActivityInput) => {
		if (editingActivity) {
			updateActivity(data, () => {
				setEditingActivity(null);
				onActivityUpdated();
			});
		} else {
			createActivity(data, () => {
				setIsAddingActivity(false);
				onActivityAdded();
			});
		}
	};

	const handleCloseForm = () => {
		setIsAddingActivity(false);
		setEditingActivity(null);
	};

	const renderActivityForm = ({
		isVisible,
		onClose,
		initialData,
		onSubmit,
		isSubmitting,
		submitError,
		tripStartDate,
		tripEndDate,
	}: {
		isVisible: boolean;
		onClose: () => void;
		initialData?: ActivityInput;
		onSubmit: (data: ActivityInput) => void;
		isSubmitting?: boolean;
		submitError?: Error | null;
		tripStartDate: string;
		tripEndDate: string;
	}) => {
		return (
			<SidePanel isOpen={isVisible} onClose={onClose}>
				<PanelTitle>{editingActivity ? 'Edit Activity' : 'Add New Activity'}</PanelTitle>
				<ActivityForm
					initialData={initialData}
					onSubmit={onSubmit}
					isSubmitting={isSubmitting || false}
					submitError={submitError || null}
					tripStartDate={tripStartDate}
					tripEndDate={tripEndDate}
				/>
			</SidePanel>
		);
	};

	return (
		<>
			<Section>
				<HeaderContainer>
					<SectionTitle>Activities</SectionTitle>
					<HeaderButton>
						<Button
							variant="primary"
							onPress={() => setIsAddingActivity(true)}
							icon={<PlusIcon size={16} color={colors.white} />}
						>
							Add Activity
						</Button>
					</HeaderButton>
				</HeaderContainer>
			</Section>

			<ContentSection>
				<ContentContainer>
					{activities && activities.length > 0 ? (
						<ActivityStepper
							activities={activities}
							tripDates={{ startDate: tripStartDate, endDate: tripEndDate }}
							tripId={tripId}
							renderActivityForm={renderActivityForm}
						/>
					) : (
						<EmptyState>
							<EmptyStateText>No activities planned yet.</EmptyStateText>
							<EmptyStateText>Start by adding your first activity to this trip.</EmptyStateText>
							<Button
								variant="primary"
								onPress={() => setIsAddingActivity(true)}
								style={{ marginTop: spacing[4] }}
							>
								Add First Activity
							</Button>
						</EmptyState>
					)}
				</ContentContainer>
			</ContentSection>

			{isAddingActivity && (
				<SidePanel isOpen={isAddingActivity} onClose={handleCloseForm}>
					<PanelTitle>Add New Activity</PanelTitle>
					<ActivityForm
						onSubmit={handleSubmit}
						isSubmitting={isCreating}
						submitError={createError as Error}
						tripStartDate={tripStartDate}
						tripEndDate={tripEndDate}
					/>
				</SidePanel>
			)}
		</>
	);
};

const Section = styled.section`
	max-width: 1536px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: ${spacing[1]}px;
	padding: ${spacing[2]}px 0 ${spacing[3]}px;
	width: 100%;
`;

const HeaderContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	align-items: center;
	padding: 0 ${spacing[2]}px;
	gap: 10rem;
`;

const SectionTitle = styled.h2`
	font-size: ${fontSizes['3xl']}px;
	font-weight: ${fontWeights.bold};
	line-height: 1.2;
	text-align: center;
	grid-column: 2;
	margin-bottom: 0;
`;

const HeaderButton = styled.div`
	grid-column: 3;
	justify-self: end;
`;

const ContentSection = styled.section`
	padding: ${spacing[2]}px 0;
`;

const ContentContainer = styled.div`
	margin: 0 auto;
	max-width: 980px;
`;

const EmptyState = styled.div`
	text-align: center;
	padding: ${spacing[8]}px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${spacing[1]}px;
`;

const EmptyStateText = styled.p`
	color: ${colors.slate[900]};
	font-size: 18px;
	line-height: 28px;
	font-weight: 300;

	&:nth-of-type(2) {
		margin-top: ${spacing[2]}px;
	}
`;

const PanelTitle = styled.h2`
	font-size: ${fontSizes['2xl']}px;
	font-weight: ${fontWeights.bold};
	margin-bottom: ${spacing[6]}px;
`;
