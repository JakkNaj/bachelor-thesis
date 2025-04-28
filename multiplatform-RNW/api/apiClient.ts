import { Platform } from 'react-native';
import { authService } from '@/lib/store/auth-service';

const API_URL = 'http://localhost:4000';

type ApiClientArgs = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  data?: any;
  signal?: AbortSignal;
  suppressError?: boolean;
};

export const apiClient = async <T>({ url, method, headers = {}, data, signal, suppressError = false }: ApiClientArgs): Promise<T> => {
  const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
  const fullUrl = `${API_URL}/${cleanUrl}`;
  
  const requestHeaders = new Headers({
    'Content-Type': 'application/json',
    ...headers,
  });

  // add Authorization header for mobile
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

    // For profile check endpoint, return null on 401 without throwing
    if (!response.ok) {
      if (suppressError && response.status === 401) {
        return null as T;
      }
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const responseData = await response.json();
    return responseData as T;
  } catch (error) {
    if (!suppressError) {
      throw error;
    }
    return null as T;
  }
};
