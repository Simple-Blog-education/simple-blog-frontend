import { currentUser } from "@/features/auth";
import { API } from "@/shared/api";
import { createAsyncAction } from "@/shared/lib/create_async_action";
import { useEffect } from "preact/hooks";

const uploadAction = createAsyncAction((file: File) => API.upload<{ avatarUrl: string }>('users/me/avatar', file, 'file'));

export function useUploadAvatar() {
    useEffect(() => () => uploadAction.reset(), []);

    const upload = async (file: File): Promise<string | undefined> => {
        if (!file.type.startsWith('image/')) {
            throw new Error("Можно загружать только изображения");
        }
        if (file.size > 5 * 1024 * 1024) {
            throw new Error("Файл слишком большой (> 5 МБ)");
        }

        const result = await uploadAction.execute(file);
        if (result?.avatarUrl) {
            if (currentUser.value) {
                currentUser.value = { ...currentUser.value, avatar_url: result.avatarUrl };
            }
            return result.avatarUrl
        }
        return undefined;
    }

    return {
        upload,
        loading: uploadAction.loading,
        error: uploadAction.error
    }
}