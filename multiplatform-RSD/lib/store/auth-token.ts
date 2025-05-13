import { Platform } from 'react-native';
import authStorage from './auth-storage';

export const getAuthToken = async (): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return null;
  }
  return authStorage.getToken();
};