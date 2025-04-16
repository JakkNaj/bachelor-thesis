import { ETripFilter } from '@/types/ETripFilter';
import { FilterTag } from '@/components/FilterTag';
import { colors } from '@/assets/colors/colors';
import { View, StyleSheet, Platform } from 'react-native';

type TTripFiltersProps = {
	activeFilter: ETripFilter;
	onFilterChange: (filter: ETripFilter) => void;
};

export const TripFilters = ({ activeFilter, onFilterChange }: TTripFiltersProps) => {

	return (
		<View style={[styles.container, Platform.OS === 'web' && styles.containerWeb]}>
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

export default TripFilters;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
		gap: 16,
		paddingTop: 4,
		paddingBottom: 16,
		backgroundColor: colors.white,
	},
	containerWeb: {
		paddingTop: 16,
	},
});
