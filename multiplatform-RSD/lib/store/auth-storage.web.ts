import { Platform } from 'react-native';

export type TStoredUser = {
    id: number;
    email: string;
    name: string;
};

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

class WebAuthStorage {
    async saveToken(token: string): Promise<void> {
        try {
            localStorage.setItem(TOKEN_KEY, token);
        } catch (error) {
            throw error;
        }
    }

    async getToken(): Promise<string | null> {
        try {
            return localStorage.getItem(TOKEN_KEY);
        } catch (error) {
            return null;
        }
    }

    async removeToken(): Promise<void> {
        try {
            localStorage.removeItem(TOKEN_KEY);
        } catch (error) {
            throw error;
        }
    }

    async saveUser(user: TStoredUser): Promise<void> {
        try {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        } catch (error) {
            throw error;
        }
    }

    async getUser(): Promise<TStoredUser | null> {
        try {
            const userData = localStorage.getItem(USER_KEY);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            return null;
        }
    }

    async removeUser(): Promise<void> {
        try {
            localStorage.removeItem(USER_KEY);
        } catch (error) {
            throw error;
        }
    }
}

// Export the same interface as native storage
export const authStorage = new WebAuthStorage();
export default authStorage;
