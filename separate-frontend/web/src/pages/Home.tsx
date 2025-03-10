import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { EAuthStatus } from '../store/authStore';

export const Home = () => {
  const { status } = useAuthStore();
  
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Plan Your Next Adventure</h1>
        <p>
          Organize your trips, add activities, and keep track of your travel plans
          all in one place.
        </p>
        
        {status === EAuthStatus.AUTHENTICATED ? (
          <div className="cta-buttons">
            <Link to="/trips" className="btn btn-primary">
              View My Trips
            </Link>
            <Link to="/trips/new" className="btn btn-secondary">
              Plan a New Trip
            </Link>
          </div>
        ) : (
          <div className="cta-buttons">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        )}
      </section>
      
      <section className="features">
        <h2>Features</h2>
        
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Trip Planning</h3>
            <p>
              Create detailed trip plans with dates, destinations, and descriptions.
            </p>
          </div>
          
          <div className="feature-card">
            <h3>Activity Management</h3>
            <p>
              Add activities to your trips with times, locations, and cost estimates.
            </p>
          </div>
          
          <div className="feature-card">
            <h3>Organized Itinerary</h3>
            <p>
              View your trip activities in a clear, chronological order.
            </p>
          </div>
          
          <div className="feature-card">
            <h3>Secure Access</h3>
            <p>
              Your trip plans are private and secure with user authentication.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}; 