import type { User } from '@/entities/user';
import { signal } from '@preact/signals'

export const currentUser = signal<User | null>(null);
export const isAuthenticated = signal<boolean>(!!localStorage.getItem('token'))

export function setUser(user: User | null) {
    currentUser.value = user;
    isAuthenticated.value = !!user;
}

export function logout() {
    localStorage.removeItem('token');
    setUser(null);
}