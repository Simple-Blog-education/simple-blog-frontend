import type { UUIDv4 } from "./uuid"

export type User = {
    id: UUIDv4;
    username: string;
    email: string,
    firstName: string | undefined;
    lastName: string | undefined;
    regDate: Date;
    role: String;
}