import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { EAuthStatus } from '../store/authStore';

type TMainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: TMainLayoutProps) => {
  const { status, logout } = useAuthStore();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <Link to="/">Trip Planner</Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {status === EAuthStatus.AUTHENTICATED && (
              <li>
                <Link to="/trips">My Trips</Link>
              </li>
            )}
            {status === EAuthStatus.AUTHENTICATED ? (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main className="app-main">
        {children}
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Trip Planner App</p>
      </footer>
    </div>
  );
}; 