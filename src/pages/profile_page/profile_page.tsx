import { UserInfo } from "@/entities/user/ui/user_info";
import { useUser } from "@/features/user/hooks/use_user";
import { Text } from "@/shared/ui";
import { useRoute } from "preact-iso";
import { useEffect } from "preact/hooks";

export function ProfilePage() {
    const { user, loadUser, loading, error } = useUser();
    const route = useRoute();
    const username = route.params.username;
    useEffect(() => { loadUser(username) }, [username]);
    if (loading.value) return <Text variant="ui">Загрузка...</Text>
    if (error.value || user.value === undefined) return <Text>Ошибка загрузки пользователя: {error.value}</Text>
    return (
        <UserInfo user={user.value} />
    )
}