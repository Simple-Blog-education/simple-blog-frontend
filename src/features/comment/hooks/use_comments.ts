import type { Comment } from "@/entities/comment";
import { createAsyncAction } from "@/shared/lib/create_async_action";
import { signal } from "@preact/signals";
import * as commentApi from '../api/comment.api'
import type { UUIDv4 } from "@/shared/lib/uuid";
import type { PaginationObject } from "@/shared/models/pagination";
import { useEffect } from "preact/hooks";

const comments = signal<Comment[]>([]);
const pagination = signal<PaginationObject | null>(null);
const searchParams = signal<commentApi.CommentSearchParams>({ page: 1, perPage: 20 });

const fetchAction = createAsyncAction(commentApi.getComments);

export function useComments() {
    const loadComments = async (params: commentApi.CommentSearchParams) => {
        const paginated = await fetchAction.execute({
            user_id: params.user_id,
            post_id: params.post_id,
            page: searchParams.value.page,
            perPage: searchParams.value.perPage
        });
        if (paginated) {
            comments.value = paginated.data;
            pagination.value = {
                page: paginated.page,
                perPage: paginated.per_page,
                total: paginated.total
            }
        }
    }
    useEffect(() => {
        loadComments(searchParams.value);
    }, [searchParams.value]);
    const goToPage = (page: number) => {
        searchParams.value = { ...searchParams.value, page };
    }

    const setPerPage = (perPage: number) => {
        searchParams.value = { ...searchParams.value, perPage, page: 1 };
    };

    const setPostId = (post_id?: UUIDv4) => {
        searchParams.value.post_id = post_id;
    }

    const setUserId = (user_id?: UUIDv4) => {
        searchParams.value.user_id = user_id;
    }

    return { comments, pagination, loading: fetchAction.loading, error: fetchAction.error, goToPage, setPerPage, setPostId, setUserId }
}

