import { Avatar } from './Avatar';
import { LogOutIcon } from '../assets/icons/LogOutIcon';

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
        <LogOutIcon />
      </button>
    </div>
  );
}; 