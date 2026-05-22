import type { User } from "@/entities/user";
import type { UUIDv4 } from "@/shared/lib/uuid";

export interface Comment {
    id: UUIDv4;
    post_id: UUIDv4;
    user: User;
    text: string;
    create_date: Date;
    likes?: number;
}

export interface NewComment {
    post_id: UUIDv4,
    user_id: UUIDv4,
    text: string
}