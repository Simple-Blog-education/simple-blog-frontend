import { setUser } from "@/features/auth/model/auth.store"
import { API } from "@/shared/api"
import type { User } from "@/entities/user"
import type { UUIDv4 } from "@/shared/lib/uuid"
import { API_ENDPOINTS } from "@/shared/api/endpoints"

export type AuthCredentials = {
    username: string,
    password: string
}

export type SignUpData = {
    username: string,
    email: string,
    password: string,
    repeatPassword?: string
}

export type SignInData = {
    user_id: UUIDv4;
    token: string;
}

export async function signIn(data: AuthCredentials) {
    try {
        let loginData: SignInData = await API.post(API_ENDPOINTS.auth.login, data);
        localStorage.setItem('token', loginData.token);
        let user: User = await API.get(`users/id/${loginData.user_id}`);
        setUser(user);
        return true;
    }
    catch {
        return false;
    }
}

export async function signUp(data: SignUpData) {
    try {
        let signedUser: User = await API.post(API_ENDPOINTS.auth.signup, data);
        if (signedUser) return true;
        return false;
    }
    catch {
        return false;
    }
}

export async function getCurrentUser() {
    return API.get<User>('auth/me');
}