import type { Post } from "@/entities/post";
import { signal } from "@preact/signals";
import * as postApi from '../api/post.api';
import { createAsyncAction } from "@/shared/lib/create_async_action";

const posts = signal<Post[]>([])

const fetchAction = createAsyncAction(postApi.getPosts);

export function usePosts() {
    const loadPosts = async () => {
        const data = await fetchAction.execute();
        if (data) {
            posts.value = data;
        }
    }

    return { posts, loading: fetchAction.loading, error: fetchAction.error, loadPosts }
}