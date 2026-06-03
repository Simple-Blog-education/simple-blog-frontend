import type { Post } from "@/entities/post";
import { signal } from "@preact/signals";
import * as postApi from '../api/post.api';
import { createAsyncAction } from "@/shared/lib/create_async_action";
import type { PaginationObject } from "@/shared/models/pagination";
import { useCallback, useEffect } from "preact/hooks";



const posts = signal<Post[]>([])
const pagination = signal<PaginationObject | null>(null);
const searchParams = signal<postApi.PostSearchParams>({ page: 1, perPage: 10 });

const fetchAction = createAsyncAction(postApi.getPosts);

export function usePosts() {
    const loadPosts = useCallback(async (params: postApi.PostSearchParams) => {
        const paginated = await fetchAction.execute(params);
        if (paginated) {
            posts.value = paginated.data;
            pagination.value = {
                total: paginated.total,
                page: paginated.page,
                perPage: paginated.per_page
            }
        }
    }, []);

    useEffect(() => {
        loadPosts(searchParams.value);
    }, [searchParams.value]);

    const goToPage = (page: number) => {
        searchParams.value = { ...searchParams.value, page };
    }

    const setPerPage = (perPage: number) => {
        searchParams.value = { ...searchParams.value, perPage, page: 1 };
    };

    const setSearchQuery = (query: string) => {
        searchParams.value = { ...searchParams.value, query: query }
    }

    return { posts, pagination, loading: fetchAction.loading, error: fetchAction.error, goToPage, setPerPage, setSearchQuery }
}