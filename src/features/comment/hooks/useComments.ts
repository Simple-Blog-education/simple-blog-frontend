import type { Comment } from "@/entities/comment";
import { createAsyncAction } from "@/shared/lib/create_async_action";
import { signal } from "@preact/signals";
import * as commentApi from '../api/comment.api'
import type { UUIDv4 } from "@/shared/lib/uuid";

const comments = signal<Comment[]>([]);

const fetchAction = createAsyncAction(commentApi.getComments);

export function useComments() {
    const loadComments = async (id: UUIDv4) => {
        const data = await fetchAction.execute(id);
        if (data) comments.value = data;
    }

    return { comments, loading: fetchAction.loading, error: fetchAction.error, loadComments }
}

