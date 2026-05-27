import { Text } from "@/shared/ui";
import type { User } from "../model/user.types";
import { formatCommentDate } from "@/shared/lib/format_post_date";

interface UserInfoParams {
    user: User
}

export function UserInfo({ user }: UserInfoParams) {
    const firstName = user.first_name ?? "Не указано";
    const lastName = user.last_name ?? "Не указано";
    return (
        <div className="user-info">
            <Text variant="ui">Имя: {firstName}</Text>
            <Text variant="ui">Фамилия: {lastName}</Text>
            <Text variant="ui">Email: {user.email}</Text>
            <Text variant="ui">Дата регистрации: {formatCommentDate(user.reg_date)}</Text>
            {user.role === "Admin" && <Text variant="error">АДМИН</Text>}
        </div>
    )
}