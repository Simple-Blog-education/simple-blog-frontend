import type { UUIDv4 } from "@/shared/lib/uuid";

export interface Comment {
    id: UUIDv4;
    post_id: UUIDv4;
    username: string;
    text: string;
    create_date: Date;
    likes: number;
    is_liked?: boolean;
}

export interface CommentPaginatedResponse {
    data: Comment[];
    page: number;
    per_page: number;
    total: number;
}

export interface NewComment {
    post_id: UUIDv4,
    user_id: UUIDv4,
    text: string
}