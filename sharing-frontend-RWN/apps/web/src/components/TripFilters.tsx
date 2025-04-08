import { FilterTag } from '@monorepo/shared/src/components/FilterTag';
import { spacing } from '@monorepo/shared/src/theme';
import { ETripFilter } from '@monorepo/shared/src/types/ETripFilter';
import styled from 'styled-components';

type TTripFiltersProps = {
	activeFilter: ETripFilter;
	onFilterChange: (filter: ETripFilter) => void;
};

export const TripFilters = ({ activeFilter, onFilterChange }: TTripFiltersProps) => {
	return (
		<Container>
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
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	gap: ${spacing[4]}px;
	padding: ${spacing[4]}px 0;
`;
