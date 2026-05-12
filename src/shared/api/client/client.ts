const BASE_URL = "http://localhost:8000/api/v1";

interface RequestOptions {
    headers?: Record<string, string>;
    body?: any;
}

class APIClient {
    private baseURL: string;
    private defaultHeaders: Record<string, string>

    constructor(baseURL: string, defaultHeaders?: Record<string, string>) {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...defaultHeaders
        };
    }

    private getAuthHeaders(): Record<string, string> {
        const token = localStorage.getItem('token');
        return token ? {Authorization: `Bearer ${token}` } : {};
    }

    private async request<T>(
        method: string,
        path: string,
        options: RequestOptions = {}
    ): Promise<T> {
        const url = `${this.baseURL}/${path}`;
        const headers = {
            ...this.defaultHeaders,
            ...this.getAuthHeaders(),
            ...options.headers,
        };

        const config: RequestInit = {
            method,
            headers
        };

        if(options.body !== undefined) {
            config.body = JSON.stringify(options.body);
        }

        let response: Response;

        try {
            response = await fetch(url, config);
        }
        catch (err: any) {
            throw new Error(`Ошибка сети: ${err.message}`)
        }
        if(!response.ok) {
            let errorMessage = response.statusText;
            try {
                const errorBody = await response.json();
                errorMessage = errorBody.message || errorBody.detail || errorMessage;
            }
            catch {}
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/auth'; // ???
            }
            throw new Error(errorMessage);
        }

        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return null as T;
        }
        return response.json();
    }

    get<T = any>(path: string, headers?: Record<string, string>) {
        return this.request<T>('GET', path, {headers})
    }

    post<T = any>(path: string, body?: any,  headers?: Record<string, string>) {
        return this.request<T>('POST', path, {body, headers})
    }

    put<T = any>(path: string, body?: any,  headers?: Record<string, string>) {
        return this.request<T>('PUT', path, {body, headers})
    }

    delete<T = any>(path: string, headers?: Record<string, string>) {
        return this.request<T>('DELETE', path, {headers})
    }
}

export const API = new APIClient(BASE_URL);
