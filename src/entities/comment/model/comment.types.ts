import type { Post } from "@/entities/post";
import type { User } from "@/entities/user";
import type { UUIDv4 } from "@/shared/lib/uuid";

export interface Comment {
    id: UUIDv4;
    post_id: UUIDv4;
    user: User;
    text: string;
    likes?: number;
}