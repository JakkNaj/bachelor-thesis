import { Platform } from 'react-native';
import authStorage from './auth-storage';
import { apiClient } from '@/api/apiClient';
import { getApiAuthCheck } from '@/api/generated/auth/auth';
import { getAuthToken } from './auth-token';

export type TAuthUser = {
  id: number;
  email: string;
  name: string;
};

class AuthService {
  async saveAuth(token: string, user: TAuthUser): Promise<void> {
    await authStorage.saveToken(token);
    await authStorage.saveUser(user);
  }

  async getToken(): Promise<string | null> {
    return getAuthToken();
  }

  async getUser(): Promise<TAuthUser | null> {
    return authStorage.getUser();
  }

  async removeAuth(): Promise<void> {
    await authStorage.removeToken();
    await authStorage.removeUser();
  }

  async logout(): Promise<void> {
    if (Platform.OS === 'web') {
      await apiClient({
        url: '/api/auth/logout',
        method: 'POST',
      });
    }
    
    await this.removeAuth();
  }

  async checkAuth(): Promise<boolean> {
    if (Platform.OS === 'web') {
      try {
        const response = await getApiAuthCheck();
        return response?.authenticated ?? false;
      } catch {
        return false;
      }
    }
    
    const token = await getAuthToken();
    const user = await authStorage.getUser();
    return !!token && !!user;
  }
}

export const authService = new AuthService();