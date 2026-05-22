import type { User } from "@/entities/user";
import { API } from "@/shared/api";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export async function getUserByUsername(username: string) {
    const user = await API.get<User>(API_ENDPOINTS.users.byUsername, {
        params: {
            username
        }
    });
    user.reg_date = new Date(user.reg_date);
    return user;
} 