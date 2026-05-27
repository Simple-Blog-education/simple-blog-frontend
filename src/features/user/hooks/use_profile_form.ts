import type { User } from "@/entities/user";
import { createAsyncAction } from "@/shared/lib/create_async_action";
import { signal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { getCurrentUser, putUser } from "../api/user.api";
import { currentUser } from "@/features/auth";

const updateAction = createAsyncAction(putUser);
const fetchAction = createAsyncAction(getCurrentUser);

const initialData = signal<Partial<User> | null>(null);

export function useProfileForm() {
    useEffect(() => {
        fetchAction.execute().then(user => {
            if (user) {
                initialData.value = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                }
            }
        });
        return () => {
            fetchAction.reset();
            updateAction.reset();
            initialData.value = null;
        }
    }, []);


    const submit = async (data: Partial<User>) => {
        if (!currentUser.value) return;
        const updated = await updateAction.execute(data);
        if (updated) {
            currentUser.value = { ...currentUser.value!, ...updated }
        }
        return updated;
    };

    return {
        initialData,
        isFetching: fetchAction.loading,
        fetchError: fetchAction.error,
        submit,
        loading: updateAction.loading,
        error: updateAction.error
    }
}