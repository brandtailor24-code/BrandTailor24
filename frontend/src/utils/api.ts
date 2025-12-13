// API utility with automatic JWT token injection

const API_BASE_URL = 'http://localhost:5000';

// Helper to get auth token
const getAuthToken = (): string | null => {
    return localStorage.getItem('token');
};

// Helper to get auth headers
const getAuthHeaders = (): HeadersInit => {
    const token = getAuthToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

// API request wrapper
export const apiRequest = async (
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> => {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
        ...options,
        headers: {
            ...getAuthHeaders(),
            ...options.headers,
        },
    };

    const response = await fetch(url, config);

    // Handle unauthorized (token expired or invalid)
    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

    return response;
};

// Convenience methods
export const api = {
    get: (endpoint: string) => apiRequest(endpoint, { method: 'GET' }),

    post: (endpoint: string, data: any) =>
        apiRequest(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    patch: (endpoint: string, data: any) =>
        apiRequest(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),

    delete: (endpoint: string) => apiRequest(endpoint, { method: 'DELETE' }),
};

export default api;
