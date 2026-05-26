import { UserInfo } from "@/entities/user/ui/user_info";
import { currentUser } from "@/features/auth";
import { useUser } from "@/features/user/hooks/use_user";
import { AppLink, Heading, Text } from "@/shared/ui";
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
        <>
            <Heading level={1}>Профиль пользователя {user.value.username}</Heading>
            <UserInfo user={user.value} />
            {currentUser.value && currentUser.value.username === user.value.username && <><AppLink href={`/profile/${currentUser.value.username}/edit`}>Редактировать профиль</AppLink>
                <AppLink href={`/profile/${currentUser.value.username}/change_password`}>Сменить пароль</AppLink></>}
        </>
    )
}