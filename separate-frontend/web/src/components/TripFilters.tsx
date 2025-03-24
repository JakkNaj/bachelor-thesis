import { ETripFilter } from '../types/trips';
import { NavigationLink } from './NavigationLink';

type TTripFiltersProps = {
  activeFilter: ETripFilter;
  onFilterChange: (filter: ETripFilter) => void;
};

export const TripFilters = ({ activeFilter, onFilterChange }: TTripFiltersProps) => {
  return (
    <div className="flex justify-center space-x-4 py-4 bg-white">
      <NavigationLink
        isActive={activeFilter === ETripFilter.ALL}
        onClick={() => onFilterChange(ETripFilter.ALL)}
      >
        All Trips
      </NavigationLink>
      <NavigationLink
        isActive={activeFilter === ETripFilter.UPCOMING}
        onClick={() => onFilterChange(ETripFilter.UPCOMING)}
      >
        Upcoming Trips
      </NavigationLink>
      <NavigationLink
        isActive={activeFilter === ETripFilter.PAST}
        onClick={() => onFilterChange(ETripFilter.PAST)}
      >
        Past Trips
      </NavigationLink>
    </div>
  );
};