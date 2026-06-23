import type { UUIDv4 } from "@/shared/lib/uuid";

export interface User {
    id: UUIDv4;
    username: string;
    email: string,
    first_name?: string | undefined;
    last_name?: string | undefined;
    reg_date: Date;
    role: 'User' | 'Admin';
    avatar_url?: string | undefined;
}