import { useGetApiTrips } from '../api/generated/trips/trips';
import { Button } from '../components/Button';
import { TripFilters } from '../components/TripFilters';
import { useState } from 'react';
import { ETripFilter } from '../components/Navigation';
import { TripCard } from '../components/TripCard';

type THomeProps = {
  className?: string;
};

export const Home = ({ className }: THomeProps) => {
  const { data: trips } = useGetApiTrips();
  console.log(trips);
  const [activeFilter, setActiveFilter] = useState<ETripFilter>('all');

  return (
    <div className={className}>
      <section className="mx-auto flex max-w-[1536px] flex-col items-start gap-[4px] py-[20px] border-b-2 border-dotted border-slate-200">
        <h1 className="text-center text-[36px] font-[700] leading-[40px] text-[rgb(9,9,11)]">
          Build your travel plans with ease!
        </h1>
        <p className="max-w-[750px] text-start text-[18px] leading-[28px] font-[300] text-[rgb(9,9,11)]">
          Accessible and customizable trip planning system. Free.
          <br />
          Made by travelers, for travelers.
        </p>
        <div className="flex w-full items-center justify-start space-x-4 pt-[8px]">
          <Button variant="primary" onClick={() => console.log('create trip form')}>
            Get Started
          </Button>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1536px] flex-col justify-center items-center gap-[4px] pb-[10px] pt-[16px]">
        <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-4xl">
          Your Trips
        </h2>
        <TripFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </section>

      <section className="container py-2">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4">
          <div className="w-full">
            {trips?.map((trip) => (
              <TripCard 
                key={trip.id} 
                title={trip.title} 
                description={trip.description} 
                startDate={trip.startDate} 
                endDate={trip.endDate} 
                activities={trip.activities || []}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}; 