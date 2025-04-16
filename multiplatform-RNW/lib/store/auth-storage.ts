import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export type TStoredUser = {
	id: number;
	email: string;
	name: string;
};

export const authStorage = {
	saveToken: async (token: string) => {
		return SecureStore.setItemAsync(TOKEN_KEY, token);
	},
	getToken: () => {
		return SecureStore.getItemAsync(TOKEN_KEY);
	},
	removeToken: () => SecureStore.deleteItemAsync(TOKEN_KEY),

	saveUser: async (user: TStoredUser) => SecureStore.setItemAsync(USER_KEY, JSON.stringify(user)),
	getUser: async () => {
		const data = await SecureStore.getItemAsync(USER_KEY);
		return data ? (JSON.parse(data) as TStoredUser) : null;
	},
	removeUser: () => SecureStore.deleteItemAsync(USER_KEY),
};

export default authStorage;
