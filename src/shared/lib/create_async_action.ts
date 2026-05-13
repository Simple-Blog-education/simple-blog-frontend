import { signal } from "@preact/signals";

export interface AsyncAction<TArgs extends any[] = [], TResult = any> {
    loading: ReturnType<typeof signal<boolean>>;
    error: ReturnType<typeof signal<string | null>>;
    execute: (...args: TArgs) => Promise<TResult | undefined>;
    reset: () => void;
}

export function createAsyncAction<TArgs extends any[] = [], TResult = any>(
    fn: (...args: TArgs) => Promise<TResult>
): AsyncAction<TArgs, TResult> {
    const loading = signal(false);
    const error = signal<string | null>(null);
    const execute = async (...args: TArgs): Promise<TResult | undefined> => {
        loading.value = true;
        error.value = null;
        try {
            return await fn(...args);
        }
        catch (e) {
            const message = e instanceof Error ? e.message : 'Неизвестная ошибка';
            error.value = message;
            return undefined;
        }
        finally {
            loading.value = false;
        }
    };
    const reset = () => {
        loading.value = false;
        error.value = null;
    }

    return { loading, error, execute, reset }
}