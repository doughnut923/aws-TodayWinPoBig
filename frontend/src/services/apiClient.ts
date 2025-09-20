// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://your-backend-api.com/api',
  ENDPOINTS: {
    GET_PLAN: '/GetPlan',
  },
  TIMEOUT: 10000, // 10 seconds
};

// HTTP Methods
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

// API Error class
export class APIError extends Error {
  public status: number;
  public statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.statusText = statusText;
  }
}

// Generic API request function
export async function apiRequest<T>(
  endpoint: string,
  method: HttpMethod = HttpMethod.GET,
  data?: any,
  headers?: Record<string, string>
): Promise<T> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  // Add body for methods that support it
  if (data && (method === HttpMethod.POST || method === HttpMethod.PUT || method === HttpMethod.PATCH)) {
    config.body = JSON.stringify(data);
  }

  // Add timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
  config.signal = controller.signal;

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new APIError(
        `HTTP Error: ${response.status} ${response.statusText}`,
        response.status,
        response.statusText
      );
    }

    const result = await response.json();
    return result as T;
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    if (error instanceof APIError) {
      throw error;
    }
    
    if (error?.name === 'AbortError') {
      throw new APIError('Request timeout', 408, 'Timeout');
    }
    
    throw new APIError(
      error?.message || 'Network error',
      0,
      'Network Error'
    );
  }
}