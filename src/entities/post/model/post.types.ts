import type { UUIDv4 } from "@/shared/lib/uuid";

export interface Post {
    id: UUIDv4;
    header: string;
    text: string;
    create_date: Date;
    edit_date: Date;
    author_username: string,
    author_avatar: string,
    author_name: string,
    likes: number,
    is_liked: boolean
}

export interface PostPaginatedResponse {
    data: Post[];
    total: number;
    page: number;
    per_page: number;
}

export interface NewPost {
    header: string;
    text: string;
    user_id: UUIDv4;
}

export interface PostChangeset {
    id: UUIDv4;
    header: string;
    text: string;
}