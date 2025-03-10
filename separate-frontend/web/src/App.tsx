import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { TripsList } from './pages/TripsList';
import { NewTrip } from './pages/NewTrip';
import { TripDetails } from './pages/TripDetails';
import { EditTrip } from './pages/EditTrip';
import { NewActivity } from './pages/NewActivity';
import { useAuthStore } from './store/authStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const App = () => {
  const { checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route
              path="/trips"
              element={
                <ProtectedRoute>
                  <TripsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trips/new"
              element={
                <ProtectedRoute>
                  <NewTrip />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trips/:tripId"
              element={
                <ProtectedRoute>
                  <TripDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trips/:tripId/edit"
              element={
                <ProtectedRoute>
                  <EditTrip />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trips/:tripId/activities/new"
              element={
                <ProtectedRoute>
                  <NewActivity />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
