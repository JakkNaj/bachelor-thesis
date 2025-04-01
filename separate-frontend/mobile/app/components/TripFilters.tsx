import { View } from "react-native";
import { ETripFilter } from "../types/trips";
import { FilterLink } from "./FilterLink";

type TTripFiltersProps = {
	activeFilter: ETripFilter;
	onFilterChange: (filter: ETripFilter) => void;
};

export const TripFilters = ({ activeFilter, onFilterChange }: TTripFiltersProps) => {
	return (
		<View className="flex-row justify-center gap-4 py-4 bg-white">
			<FilterLink isActive={activeFilter === ETripFilter.ALL} onPress={() => onFilterChange(ETripFilter.ALL)}>
				All Trips
			</FilterLink>
			<FilterLink isActive={activeFilter === ETripFilter.UPCOMING} onPress={() => onFilterChange(ETripFilter.UPCOMING)}>
				Upcoming Trips
			</FilterLink>
			<FilterLink isActive={activeFilter === ETripFilter.PAST} onPress={() => onFilterChange(ETripFilter.PAST)}>
				Past Trips
			</FilterLink>
		</View>
	);
};
