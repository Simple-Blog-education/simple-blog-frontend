import type { NewComment } from "@/entities/comment";
import type { CommentPaginatedResponse } from "@/entities/comment/model/comment.types";
import { API } from "@/shared/api";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import type { UUIDv4 } from "@/shared/lib/uuid";

export interface CommentSearchParams {
    post_id?: UUIDv4,
    user_id?: UUIDv4,
    page: number;
    perPage: number;
}

export async function getComments(params: CommentSearchParams) {
    if (!params.post_id && !params.user_id) return;
    const paginated = await API.get<CommentPaginatedResponse>(API_ENDPOINTS.comments.get, {
        params: {
            post_id: params.post_id,
            user_id: params.user_id,
            page: params.page,
            per_page: params.perPage
        }
    });
    for (let comment of paginated.data) {
        comment.create_date = new Date(comment.create_date);
    }
    return paginated;
}

export async function createComment(data: NewComment) {
    return await API.post(API_ENDPOINTS.comments.create, data);
}