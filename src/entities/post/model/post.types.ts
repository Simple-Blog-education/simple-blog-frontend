import type { User } from "@/entities/user";
import type { UUIDv4 } from "@/shared/lib/uuid";

export interface Post {
    id: UUIDv4;
    header: string;
    text: string;
    create_date: Date;
    edit_date: Date;
    user_id: UUIDv4;
    user?: User;
    likesCount: number;
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