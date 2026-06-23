import { buildUrl, type QueryParams } from "@/shared/lib/build_url";

const BASE_URL = "http://localhost:8000/api/v1";
const UPLOAD_URL = "http://localhost:8000";

interface RequestOptions {
    headers?: Record<string, string>;
    params?: QueryParams
    body?: any;
}

class APIClient {
    private baseURL: string;
    private defaultHeaders: Record<string, string>
    private uploadURL = UPLOAD_URL;

    constructor(baseURL: string, defaultHeaders?: Record<string, string>) {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...defaultHeaders
        };
    }

    getUploadURL(): string {
        return this.uploadURL;
    }

    private getAuthHeaders(): Record<string, string> {
        const token = localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
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

        if (options.body !== undefined) {
            config.body = JSON.stringify(options.body);
        }

        let response: Response;

        try {
            response = await fetch(url, config);
        }
        catch (err: any) {
            throw new Error(`Ошибка сети: ${err.message}`)
        }
        if (!response.ok) {
            let errorMessage = response.statusText;
            try {
                const errorBody = await response.json();
                errorMessage = errorBody.message || errorBody.detail || errorMessage;
            }
            catch { }
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

    get<T = any>(path: string, config?: RequestOptions) {
        const fullPath = buildUrl(path, config?.params);
        return this.request<T>('GET', fullPath, { headers: config?.headers });
    }

    post<T = any>(path: string, body?: any, headers?: Record<string, string>) {
        return this.request<T>('POST', path, { body, headers });
    }

    put<T = any>(path: string, body?: any, headers?: Record<string, string>) {
        return this.request<T>('PUT', path, { body, headers });
    }

    delete<T = any>(path: string, config?: RequestOptions) {
        const fullPath = buildUrl(path, config?.params);
        return this.request<T>('DELETE', fullPath, { headers: config?.headers });
    }

    async upload<T = any>(path: string, file: File, fieldName = 'avatar'): Promise<T> {
        const url = `${this.baseURL}/${path}`;
        const formData = new FormData();
        formData.append(fieldName, file);

        const headers = {
            ...this.getAuthHeaders(),
        }

        const config: RequestInit = {
            method: 'POST',
            headers,
            body: formData
        };

        let response: Response;

        try {
            response = await fetch(url, config);
        }
        catch (err: any) {
            throw new Error(`Ошибка сети: ${err.message}`);
        }

        if (!response.ok) {
            let errorMsg = response.statusText;
            try {
                const errorBody = await response.json();
                errorMsg = errorBody.message || errorBody.detail || errorMsg;
            }
            catch { }
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/auth';
            }
            throw new Error(errorMsg);
        }

        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return null as T;
        }

        return response.json();
    }
}

export const API = new APIClient(BASE_URL);
