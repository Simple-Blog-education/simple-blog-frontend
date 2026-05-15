import type { UUIDv4 } from "@/shared/lib/uuid";

export interface User {
    id: UUIDv4;
    username: string;
    email: string,
    firstName?: string | undefined;
    lastName?: string | undefined;
    regDate: Date;
    role: 'User' | 'Admin';
}