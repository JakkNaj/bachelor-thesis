import { Platform } from 'react-native';
import authStorage from './auth-storage';

export type TAuthUser = {
  id: number;
  email: string;
  name: string;
};

class AuthService {
  async saveAuth(token: string, user: TAuthUser): Promise<void> {
    if (Platform.OS === 'web') {
      // On web, auth is handled by HTTP-only cookies
      return;
    }
    await authStorage.saveToken(token);
    await authStorage.saveUser(user);
  }

  async getToken(): Promise<string | null> {
    if (Platform.OS === 'web') {
      // On web, token is handled by HTTP-only cookies
      return null;
    }
    return authStorage.getToken();
  }

  async getUser(): Promise<TAuthUser | null> {
    return authStorage.getUser();
  }

  async removeAuth(): Promise<void> {
    if (Platform.OS === 'web') {
      // On web, auth removal is handled by HTTP-only cookies
      return;
    }
    await authStorage.removeToken();
    await authStorage.removeUser();
  }
}

export const authService = new AuthService(); 