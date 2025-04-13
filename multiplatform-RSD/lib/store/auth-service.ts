import authStorage from './auth-storage';

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
    return authStorage.getToken();
  }

  async getUser(): Promise<TAuthUser | null> {
    return authStorage.getUser();
  }

  async removeAuth(): Promise<void> {
    await authStorage.removeToken();
    await authStorage.removeUser();
  }
}

export const authService = new AuthService(); 