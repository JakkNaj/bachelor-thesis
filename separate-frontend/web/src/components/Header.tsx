import { UserControls, ETripFilter } from './Navigation';
import { Link } from 'react-router-dom';

type THeaderProps = {
  activeFilter: ETripFilter;
  onFilterChange: (filter: ETripFilter) => void;
  userName: string;
  onLogout: () => void;
};

export const Header = ({
  activeFilter,
  onFilterChange,
  userName,
  onLogout,
}: THeaderProps) => {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8">
              <svg 
                viewBox="0 0 1024 1024" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <g>
                  <path d="M868 169l-65-17 65-18 18-65 18 65 65 18-65 17-18 65-18-65zM133 809l-41-10 41-10 9-41 10 41 41 10-41 10-10 41-9-41z" fill="#FDCD60"/>
                  <path d="M932 240l-25-6 25-6 6-25 6 25 25 6-25 6-6 25-6-25zM122 471l-24-5 24-6 5-24 6 24 24 6-24 5-6 24-5-24z" fill="#FDCD60"/>
                  <path d="M123 280m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0Z" fill="#5546CB"/>
                  <path d="M863 734a25 25 0 1 1 25-25 25 25 0 0 1-25 25z m0-36a10 10 0 1 0 10 10 10 10 0 0 0-10-10z" fill="#5546CB"/>
                  <path d="M765 777c0 18-18 33-40 33H295c-22 0-40-15-40-33V251c0-18 18-33 40-33h430c22 0 40 15 40 33v526z" fill="#FFFFFF"/>
                  <path d="M258 220l499 0 0 590.38-499 0 0-590.38Z" fill="#FDCD60"/>
                  <path d="M726 200H600v-75c0-11-10-20-23-20h-18v15a8 8 0 0 1-1 5h22v75H439v-75h22a8 8 0 0 1-1-5v-16h-18c-12 0-22 9-23 20v75H291c-28 0-50 20-50 44v543c0 24 23 44 50 44h90a47 47 0 1 0 56 0h147a47 47 0 1 0 56 0h86c28 0 50-20 50-44V244c0-24-22-44-50-44zM409 894a27 27 0 1 1 27-27 27 27 0 0 1-27 27z m203 0a27 27 0 1 1 27-27 27 27 0 0 1-27 27z m145-108c0 13-14 24-30 24H291c-17 0-30-11-30-24V244c0-13 14-24 30-24h435c17 0 30 11 30 24z" fill="#5546CB"/>
                  <path d="M342 345a10 10 0 0 0-10 10v317a10 10 0 0 0 20 0V355a10 10 0 0 0-10-10zM409 345a10 10 0 0 0-10 10v317a10 10 0 0 0 20 0V355a10 10 0 0 0-10-10zM477 345a10 10 0 0 0-10 10v317a10 10 0 1 0 20 0V355a10 10 0 0 0-10-10zM544 345a10 10 0 0 0-10 10v317a10 10 0 0 0 20 0V355a10 10 0 0 0-10-10zM611 345a10 10 0 0 0-10 10v317a10 10 0 0 0 20 0V355a10 10 0 0 0-10-10zM679 345a10 10 0 0 0-10 10v317a10 10 0 0 0 20 0V355a10 10 0 0 0-10-10z" fill="#5546CB"/>
                  <path d="M409 841a27 27 0 1 0 27 27 27 27 0 0 0-27-27zM612 841a27 27 0 1 0 27 27 27 27 0 0 0-27-27z" fill="#AFBCF3"/>
                  <path d="M459 120a8 8 0 0 0 1 5 12 12 0 0 0 10 5h77a12 12 0 0 0 10-5 8 8 0 0 0 1-5v-16c-1-4-6-7-11-7h-76c-5 0-10 3-11 7v15z" fill="#F97744"/>
                </g>
              </svg>
            </div>
            <span className="text-xl font-semibold text-slate-900">TripPlanner</span>
          </Link>
        </div>


        <div className="flex-shrink-0">
          <UserControls
            userName={userName}
            onLogout={onLogout}
          />
        </div>
      </div>
    </header>
  );
}; 