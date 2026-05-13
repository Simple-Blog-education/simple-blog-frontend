import { setUser } from "@/features/auth/model/auth.store"
import { API } from "@/shared/api"
import type { User } from "@/entities/user"
import type { UUIDv4 } from "@/shared/lib/uuid"

type AuthCredentials = {
    username: string,
    password: string
}

type SignUpData = {
    username: string,
    email: string,
    password: string
}

type LoginData = {
    user_id: UUIDv4;
    token: string;
}

export async function signIn(data: AuthCredentials) {
    let loginData: LoginData = await API.post('auth/login', data);
    localStorage.setItem('token', loginData.token);
    let user: User = await API.get(`users/${loginData.user_id}`);
    setUser(user);
    return true;
}

export async function signUp(data: SignUpData) {
    let success = await API.post('auth/signup', data);
    if (success == "Success") console.log("Sign up successful");
    else return false;
    return true;
}