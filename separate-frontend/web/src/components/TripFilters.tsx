import { NavigationLink } from './NavigationLink';
import { ETripFilter } from './Navigation';

type TTripFiltersProps = {
  activeFilter: ETripFilter;
  onFilterChange: (filter: ETripFilter) => void;
};

export const TripFilters = ({ activeFilter, onFilterChange }: TTripFiltersProps) => {
  return (
    <div className="flex justify-center space-x-4 py-4 bg-white">
      <NavigationLink
        isActive={activeFilter === 'all'}
        onClick={() => onFilterChange('all')}
      >
        All Trips
      </NavigationLink>
      <NavigationLink
        isActive={activeFilter === 'upcoming'}
        onClick={() => onFilterChange('upcoming')}
      >
        Upcoming Trips
      </NavigationLink>
      <NavigationLink
        isActive={activeFilter === 'past'}
        onClick={() => onFilterChange('past')}
      >
        Past Trips
      </NavigationLink>
    </div>
  );
};