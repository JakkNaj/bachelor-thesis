import { Platform } from 'react-native';
import authStorage from './auth-storage';

export const getAuthToken = async (): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return null; // Web uses HTTP-only cookies
  }
  return authStorage.getToken();
};