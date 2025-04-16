export type TStoredUser = {
    id: number;
    email: string;
    name: string;
};

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

class WebAuthStorage {
    async saveToken(token: string): Promise<void> {
        // do not save token on web - it is automatically saved in the browser httpOnly cookie
        return Promise.resolve();
    }

    async getToken(): Promise<string | null> {
        // no token saved on web
       return Promise.resolve(null);
    }

    async removeToken(): Promise<void> {
        // no token saved on web
        return Promise.resolve();
    }

    async saveUser(user: TStoredUser): Promise<void> {
        try {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        } catch (error) {
            console.error('Error saving user to localStorage:', error);
            throw error;
        }
    }

    async getUser(): Promise<TStoredUser | null> {
        try {
            const userData = localStorage.getItem(USER_KEY);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error getting user from localStorage:', error);
            return null;
        }
    }

    async removeUser(): Promise<void> {
        try {
            localStorage.removeItem(USER_KEY);
        } catch (error) {
            console.error('Error removing user from localStorage:', error);
            throw error;
        }
    }
}

// export the same interface as native storage
export const authStorage = new WebAuthStorage();
export default authStorage;
