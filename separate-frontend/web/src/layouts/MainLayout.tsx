import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { EAuthStatus } from '../store/authStore';
import { Header } from '../components/Header';
import { ETripFilter } from '../components/Navigation';

type TMainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: TMainLayoutProps) => {
  const { status, logout, user } = useAuthStore();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<ETripFilter>('all');
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleFilterChange = (filter: ETripFilter) => {
    setActiveFilter(filter);
    // You can implement actual filtering logic here or pass the filter to your trips list component
  };
  
  return (
    <div className="min-h-screen bg-white-100">
      {status === EAuthStatus.AUTHENTICATED && (
        <Header
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          userName={user?.name || 'User'}
          onLogout={handleLogout}
        />
      )}
      <main className="max-w-7xl mx-auto px-4 py-[10px]">
        {children}
      </main>
      <footer className="border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-slate-600">
          <p>&copy; {new Date().getFullYear()} Trip Planner App</p>
        </div>
      </footer>
    </div>
  );
}; 