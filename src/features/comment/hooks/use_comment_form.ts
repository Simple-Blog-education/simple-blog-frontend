import { createAsyncAction } from "@/shared/lib/create_async_action";
import * as commentApi from '../api/comment.api'
import type { NewComment } from "@/entities/comment";
const createAction = createAsyncAction(commentApi.createComment);

export function useCommentForm() {

    const createComment = async (data: NewComment) => {
        createAction.execute(data);
    }

    return { createComment, loading: createAction.loading, error: createAction.error }
}