import type { Post } from "@/entities/post";
import { signal } from "@preact/signals";
import * as postApi from '../api/post.api';
import type { UUIDv4 } from "@/shared/lib/uuid";
import { createAsyncAction } from "@/shared/lib/create_async_action";

const post = signal<Post | undefined>(undefined);
const fetchAction = createAsyncAction(postApi.getPostById);

export function usePost() {
    const loadPost = async (id: UUIDv4) => {
        const data = await fetchAction.execute(id);
        if (data) post.value = data;
    }

    return { post, loading: fetchAction.loading, error: fetchAction.error, loadPost }
}
