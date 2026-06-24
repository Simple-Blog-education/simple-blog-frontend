import { createAsyncAction } from "@/shared/lib/create_async_action";
import * as userApi from "../api/user.api";
import { signal } from "@preact/signals";
import type { User } from "@/entities/user";

const user = signal<User | undefined>(undefined);

const fetchAction = createAsyncAction(userApi.getUserByUsername);

export function useUser() {
    const loadUser = async (username: string) => {
        const data = await fetchAction.execute(username);
        if (data) user.value = data;
    }

    return { user, loadUser, loading: fetchAction.loading, error: fetchAction.error }
}