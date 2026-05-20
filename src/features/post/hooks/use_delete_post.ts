import { createAsyncAction } from "@/shared/lib/create_async_action";
import * as postApi from '../api/post.api';
import { useEffect } from "preact/hooks";
import type { UUIDv4 } from "@/shared/lib/uuid";

const deleteAction = createAsyncAction(postApi.deletePost);

export function useDeletePost() {

    useEffect(() => deleteAction.reset(), []);

    const removePost = async (postId: UUIDv4): Promise<boolean> => {
        const result = await deleteAction.execute(postId);
        return result !== undefined;
    };

    return { removePost, loading: deleteAction.loading, error: deleteAction.error }

}