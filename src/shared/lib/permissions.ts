import { currentUser } from "@/features/auth";
import { computed } from "@preact/signals";
import type { UUIDv4 } from "./uuid";

export const isAdmin = computed(() => currentUser.value?.role === 'Admin');

export function isOwner(ownerId: UUIDv4): boolean {
    const user = currentUser.value;
    if (!user) return false;
    return user.id === ownerId;
}