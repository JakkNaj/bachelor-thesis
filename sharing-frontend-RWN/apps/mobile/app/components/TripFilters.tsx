import { ETripFilter } from '@monorepo/shared/dist/types/ETripFilter';
import { FilterTag } from '@monorepo/shared/src/components/FilterTag';
import { colors, spacing } from '@monorepo/shared/src/theme';
import { createStyles } from '@monorepo/shared/src/utils/createStyles';
import { View } from 'react-native';

type TTripFiltersProps = {
	activeFilter: ETripFilter;
	onFilterChange: (filter: ETripFilter) => void;
};

export const TripFilters = ({ activeFilter, onFilterChange }: TTripFiltersProps) => {
	const styles = useStyles();

	return (
		<View style={styles.container}>
			<FilterTag
				isActive={activeFilter === ETripFilter.ALL}
				onPress={() => onFilterChange(ETripFilter.ALL)}
			>
				All Trips
			</FilterTag>
			<FilterTag
				isActive={activeFilter === ETripFilter.UPCOMING}
				onPress={() => onFilterChange(ETripFilter.UPCOMING)}
			>
				Upcoming Trips
			</FilterTag>
			<FilterTag
				isActive={activeFilter === ETripFilter.PAST}
				onPress={() => onFilterChange(ETripFilter.PAST)}
			>
				Past Trips
			</FilterTag>
		</View>
	);
};

type TTripFiltersStyles = {
	container: object;
};

const useStyles = () => {
	return createStyles<TTripFiltersStyles>(theme => ({
		container: {
			flexDirection: 'row',
			justifyContent: 'center',
			gap: spacing[4],
			paddingTop: spacing[2],
			paddingBottom: spacing[4],
			backgroundColor: colors.white,
		},
	}));
};
