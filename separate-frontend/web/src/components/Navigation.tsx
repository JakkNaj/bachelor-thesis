import { Avatar } from './Avatar';

export type ETripFilter = 'all' | 'upcoming' | 'past';

type TUserControlsProps = {
  userName: string;
  onLogout: () => void;
};

export const UserControls = ({ userName, onLogout }: TUserControlsProps) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar name={userName} size="sm" />
      <button 
        onClick={onLogout}
        className="p-1.5 rounded-md hover:bg-slate-100 transition-colors"
        title="Logout"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="w-5 h-5 text-slate-600"
        >
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </div>
  );
}; 