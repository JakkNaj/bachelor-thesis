import { Platform } from 'react-native';
import { authService } from '@/lib/store/auth-service';

const API_URL = 'http://localhost:4000';

type ApiClientArgs = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  data?: any;
  signal?: AbortSignal;
};

export const apiClient = async <T>({ url, method, headers = {}, data, signal }: ApiClientArgs): Promise<T> => {
  const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
  const fullUrl = `${API_URL}/${cleanUrl}`;
  
  const requestHeaders = new Headers({
    'Content-Type': 'application/json',
    ...headers,
  });

  // Add Authorization header for mobile
  if (Platform.OS !== 'web') {
    const token = await authService.getToken();
    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`);
    }
  }

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: requestHeaders,
      body: data ? JSON.stringify(data) : undefined,
      signal,
      credentials: Platform.OS === 'web' ? 'include' : 'omit',
    });

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const responseData = await response.json();
    return responseData as T;
  } catch (error) {
    console.error('Request error:', error);
    throw error;
  }
};
