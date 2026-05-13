import type { Post } from "@/entities/post";
import { signal } from "@preact/signals";
import * as postApi from '../api/post.api';

const posts = signal<Post[]>([])
const loading = signal(false);
const error = signal<string | null>(null);

export function usePosts() {
    const loadPosts = async () => {
        loading.value = true;
        error.value = null;
        try {
            posts.value = await postApi.getPosts();
        }
        catch (e) {
            error.value = (e as Error).message;
        }
        finally {
            loading.value = false;
        }
    }

    return { posts, loading, error, loadPosts }
}