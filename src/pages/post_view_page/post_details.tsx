import { useEffect } from "preact/hooks";
import { useLocation, useRoute } from "preact-iso";
import './post_details.css'
import { AppLink, Heading, Markdown, UserAvatar } from "@/shared/ui";
import { usePost } from "@/features/post";
import type { UUIDv4 } from "@/shared/lib/uuid";
import { Text, Notification, Button } from "@/shared/ui";
import { formatPostDate } from "@/shared/lib/format_post_date";
import { CommentList } from "@/features/comment/ui/comment_list";
import { CommentForm } from "@/features/comment/ui/comment_form";
import { currentUser } from "@/features/auth";
import { isAdmin } from "@/shared/lib/permissions";

export function PostDetails() {
    const route = useRoute();
    const location = useLocation();
    const { post, loading, error, loadPost } = usePost();
    const postId = route.params.id as UUIDv4;

    useEffect(() => { if (postId) loadPost(postId); }, [postId])

    if (loading.value) return <section class="post-details"><Text variant="ui">Загрузка...</Text></section>;
    if (error.value) return (
        <section class="post-details">
            <Notification variant="error" text={error.value} />
            <Button onClick={() => postId && loadPost(postId)}>Повторить</Button>
        </section>
    );
    if (!post.value) return <section class="post-details"><Text variant="ui">Пост не найден</Text></section>;

    const { text, create_date, edit_date } = post.value;
    const dateString = formatPostDate(
        create_date, //? new Date(create_date) : new Date(),
        edit_date // ? new Date(edit_date) : undefined
    );
    return (
        <section class="post-details">
            <time dateTime={create_date?.toISOString()}>{dateString}</time>
            <AppLink className='post_card_author' href={`/profile/${post.value.author_username}`}>
                <UserAvatar user={{ username: post.value.author_username, avatar_url: post.value.author_avatar }} />
                <Text variant='ui'>Автор: {post.value.author_name ?? post.value.author_username}</Text>
            </AppLink>
            <Markdown content={text} />
            {isAdmin.value && <Button variant="primary" onClick={() => location.route(`/posts/${postId}/edit`)}>Редактировать</Button>}
            <Heading level={2} variant="display">Комментарии</Heading>
            {currentUser.value && <CommentForm userId={currentUser.value.id} postId={postId} />}
            {!currentUser.value && <Text>Войдите, чтобы оставить комментарий!</Text>}
            <CommentList post_id={postId} />
        </section >
    )
}