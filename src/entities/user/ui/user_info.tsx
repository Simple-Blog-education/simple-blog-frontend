import { Text } from "@/shared/ui";
import type { User } from "../model/user.types";

interface UserInfoParams {
    user: User
}

export function UserInfo({ user }: UserInfoParams) {
    const firstName = user.first_name ?? "Не указано";
    const lastName = user.last_name ?? "Не указано";
    return (
        <div className="user-info">
            <Text>Имя: {firstName}</Text>
            <Text>Фамилия: {lastName}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Дата регистрации: {user.reg_date}</Text>
            {user.role == "Admin" && <Text>АДМИН</Text>}
        </div>
    )
}