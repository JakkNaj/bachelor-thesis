import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { EAuthStatus } from '../store/authStore';
import { Header } from '../components/Header';

type TMainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: TMainLayoutProps) => {
  const { status, logout, user } = useAuthStore();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen h-screen flex flex-col bg-white-100">
      {status === EAuthStatus.AUTHENTICATED && (
        <Header
          userName={user?.name || 'User'}
          onLogout={handleLogout}
        />
      )}
      <main className="w-full max-w-[1536px] mx-auto px-4 flex-1">
        {children}
      </main>
      <footer className="border-t border-slate-200">
        <div className="w-full max-w-[1536px] mx-auto px-4 py-6 text-sm text-slate-600">
          <p>&copy; {new Date().getFullYear()} Trip Planner App</p>
        </div>
      </footer>
    </div>
  );
}; 