const BASE_URL = "http://192.168.31.83:8000/api/v1";
class APIClient {
    baseURL: string;
    defaultHeaders?: any;
    constructor(baseURL: string, defaultHeaders?: any) {
        this.baseURL = baseURL
        this.defaultHeaders = defaultHeaders
    }
    async get(path:string, headers?: any) {
        const response = await fetch(
            `${BASE_URL}/${path}`,
            {
                method: "GET",
                headers: headers ?? this.defaultHeaders
            }
        )
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
    }
    async post(path:string, body?: any, headers?: any) {
        const response = await fetch(
            `${BASE_URL}/${path}`,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {...headers, ...this.defaultHeaders }
            }
        );
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
    }
    async put(path:string, body?: any, headers?: any) {
        const response = await fetch(
            `${BASE_URL}/${path}`,
            {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {...headers, ...this.defaultHeaders }
            }
        );
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
    }
    async delete(path: string, headers?: any) {
        const response = await fetch(
            `${BASE_URL}/${path}`,
            {
                method: "DELETE",
                headers: {...headers, ...this.defaultHeaders }
            }
        );
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
    }
}

export const API = new APIClient(BASE_URL);
