import { UserControls } from './Navigation';
import { Link } from 'react-router-dom';
import { LogoIcon } from '../assets/icons/LogoIcon';

type THeaderProps = {
  userName: string;
  onLogout: () => void;
};

export const Header = ({
  userName,
  onLogout,
}: THeaderProps) => {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="w-full max-w-[1536px] mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8">
              <LogoIcon />
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