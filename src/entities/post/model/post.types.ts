import type { User } from "@/entities/user";

export interface Post {
    id: number;
    header: string;
    text: string;
    create_date: Date;
    edit_date: Date;
    user_id: number;
    user?: User;
    likesCount: number;
}