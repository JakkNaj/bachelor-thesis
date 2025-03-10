import { create } from 'zustand';
import Cookies from 'js-cookie';
import { UserResponse } from '../api/generated/schemas';
import { customInstance } from '../api/mutator/custom-instance';

export enum EAuthStatus {
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  LOADING = 'loading',
}

type TAuthStore = {
  status: EAuthStatus;
  user: UserResponse | null;
  token: string | null;
  setAuth: (token: string, user: UserResponse) => void;
  clearAuth: () => void;
  logout: () => Promise<void>;
  checkAuth: () => void;
};

export const useAuthStore = create<TAuthStore>((set) => ({
  status: EAuthStatus.LOADING,
  user: null,
  token: null,
  
  setAuth: (token, user) => {
    // Set token in HTTP-only cookie
    Cookies.set('auth_token', token, { 
      expires: 7, // 7 days
      secure: true,
      sameSite: 'strict'
    });
    
    set({ 
      status: EAuthStatus.AUTHENTICATED,
      token,
      user
    });
  },
  
  clearAuth: () => {
    // Remove token from cookies
    Cookies.remove('auth_token');
    
    set({ 
      status: EAuthStatus.UNAUTHENTICATED,
      token: null,
      user: null
    });
  },
  
  logout: async () => {
    try {
      // Call the logout API endpoint
      await customInstance({
        url: '/api/auth/logout',
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear auth state, even if the API call fails
      Cookies.remove('auth_token');
      set({ 
        status: EAuthStatus.UNAUTHENTICATED,
        token: null,
        user: null
      });
    }
  },
  
  checkAuth: () => {
    const token = Cookies.get('auth_token');
    
    if (token) {
      // In a real app, you might want to validate the token here
      // by calling the profile endpoint
      set({ 
        status: EAuthStatus.AUTHENTICATED,
        token
      });
      
      // Fetch user profile
      customInstance<UserResponse>({
        url: '/api/users/profile',
        method: 'GET',
      })
        .then((user) => {
          set({ user });
        })
        .catch(() => {
          // If profile fetch fails, clear auth
          Cookies.remove('auth_token');
          set({ 
            status: EAuthStatus.UNAUTHENTICATED,
            token: null,
            user: null
          });
        });
    } else {
      set({ 
        status: EAuthStatus.UNAUTHENTICATED,
        token: null,
        user: null
      });
    }
  }
})); 