export type QueryParams = Record<string, string | number | boolean | undefined | null>;

export function buildUrl(path: string, params?: QueryParams): string {
    if (!params) return path;

    const url = new URL(path, "http://localhost/");
    const searchParams = url.searchParams;

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.set(key, String(value));
        }
    });
    return url.pathname + url.search;
}