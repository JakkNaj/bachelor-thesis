
import { FilterTag } from '@/components/FilterTag';
import { ETripFilter } from '@/types/ETripFilter';
import { css, html } from 'react-strict-dom';
import { colors } from '@/assets/colors/colors';

type TTripFiltersProps = {
	activeFilter: ETripFilter;
	onFilterChange: (filter: ETripFilter) => void;
};

export const TripFilters = ({ activeFilter, onFilterChange }: TTripFiltersProps) => {
	return (
		<html.div style={styles.container()}>
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
		</html.div>
	);
};

export default TripFilters;

const styles = css.create({
    container: () => ({
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        paddingTop: '0.5rem',
        paddingBottom: '1rem',
        backgroundColor: colors.white,
    }),
})