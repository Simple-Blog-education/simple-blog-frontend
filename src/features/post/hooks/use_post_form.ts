import type { NewPost } from "@/entities/post";
import { createAsyncAction } from "@/shared/lib/create_async_action";
import * as postApi from '../api/post.api';
import { useEffect } from "preact/hooks";
import type { PostChangeset } from "@/entities/post/model/post.types";
import { signal } from "@preact/signals";
import type { UUIDv4 } from "@/shared/lib/uuid";

const createAction = createAsyncAction(postApi.createPost);
const updateAction = createAsyncAction(postApi.updatePost);
const fetchAction = createAsyncAction(postApi.getPostById);

const initialData = signal<PostChangeset | null>(null);

export function usePostForm(postId?: UUIDv4 | null) {
    useEffect(() => () => {
        createAction.reset();
        updateAction.reset();
        fetchAction.reset();
        initialData.value = null;
    }, []);

    useEffect(() => {
        if (!postId) {
            initialData.value = null;
            return;
        }
        fetchAction.execute(postId).then((post) => {
            if (post) initialData.value = {
                id: post.id,
                header: post.header,
                text: post.text
            }
            else {
                initialData.value = null;
            }
        });
    }, [postId]);

    const submit = async (data: NewPost) => {
        const result = await createAction.execute(data);
        return result;
    };

    const update = async (data: PostChangeset) => {
        const result = await updateAction.execute(data);
        return result;
    }

    const activeAction = postId ? updateAction : createAction;

    return {
        submit,
        update,
        loading: activeAction.loading,
        error: activeAction.error,
        initialData,
        isFetching: fetchAction.loading,
        fetchError: fetchAction.error,
    };
}