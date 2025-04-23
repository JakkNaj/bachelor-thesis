import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { authService } from './auth-service';
import { TAuthUser } from './auth-service';

type TAuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: TAuthUser | null;
  signIn: (token: string, user: TAuthUser) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<TAuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  signIn: async () => {},
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<TAuthUser | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isAuth = await authService.checkAuth();
        setIsAuthenticated(isAuth);
        
        if (isAuth) {
          const userData = await authService.getUser();
          setUser(userData);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const signIn = async (token: string, userData: TAuthUser) => {
    await authService.saveAuth(token, userData);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const signOut = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 