import { Platform } from 'react-native';
import authStorage from './auth-storage';

export const getAuthToken = async (): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return null; // Web uses HTTP-only cookies
  }
  return authStorage.getToken();
};

export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  if (Platform.OS === 'web') {
    return {}; // Web uses HTTP-only cookies
  }
  
  const token = await getAuthToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}; 