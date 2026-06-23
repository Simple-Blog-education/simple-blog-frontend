import { UserInfo } from "@/entities/user/ui/user_info";
import { currentUser } from "@/features/auth";
import { CommentList } from "@/features/comment/ui/comment_list";
import { useUser } from "@/features/user/hooks/use_user";
import { AppLink, Heading, Text } from "@/shared/ui";
import { useRoute } from "preact-iso";
import { useEffect } from "preact/hooks";
import './profile_page.css'
import { UserAvatar } from "@/shared/ui/user_avatar/user_avatar";

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
            <section className="user-profile">
                <UserAvatar user={user.value} />
                <UserInfo user={user.value} />
                {currentUser.value && currentUser.value.username === user.value.username &&
                    <section className="user-actions">
                        <AppLink href={`/profile/${currentUser.value.username}/edit`}>Редактировать профиль</AppLink>
                        <AppLink href={`/profile/${currentUser.value.username}/change_password`}>Сменить пароль</AppLink>
                    </section>
                }
                <Heading level={2}>Комментарии пользователя</Heading>
                <CommentList user_id={user.value.id}></CommentList>
            </section>
        </>
    )
}