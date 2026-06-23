import type { User } from "@/entities/user";
import { API } from "@/shared/api";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export interface PasswordChangeset {
    old_password: string,
    new_password: string
}

export async function getUserByUsername(username: string) {
    const user = await API.get<User>(API_ENDPOINTS.users.byUsername(username));
    user.reg_date = new Date(user.reg_date);
    return user;
}


export async function putUser(user: Partial<User>) {
    if (!user.id) return;
    return await API.put<Partial<User>>(API_ENDPOINTS.users.putById(user.id), {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
    });
}

export async function changePassword(changeset: PasswordChangeset) {
    return await API.put<PasswordChangeset>(API_ENDPOINTS.auth.changePassword, changeset)
}

export async function getCurrentUser() {
    return API.get<User>('auth/me');
}