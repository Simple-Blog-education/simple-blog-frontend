import { useEffect } from "preact/hooks";
import { useLocation, useRoute } from "preact-iso";
import './post_details.css'
import { Heading, Markdown } from "@/shared/ui";
import { usePost } from "@/features/post";
import type { UUIDv4 } from "@/shared/lib/uuid";
import { Text } from "@/shared/ui";
import { Button } from "@/shared/ui/button/button";
import { formatPostDate } from "@/shared/lib/format_post_date";
import { CommentList } from "@/features/comment/ui/comment_list";

export function PostDetails() {
    const route = useRoute();
    const location = useLocation();
    const { post, loading, error, loadPost } = usePost();
    const postId = route.params.id as UUIDv4;

    useEffect(() => { if (postId) loadPost(postId); }, [postId])

    if (loading.value) return <main class="post-details"><Text variant="ui">Загрузка...</Text></main>;
    if (error.value) return (
        <section class="post-details">
            <Text variant="body">{error.value}</Text>
            <Button onClick={() => postId && loadPost(postId)}>Повторить</Button>
        </section>
    );
    if (!post.value) return <main class="post-details"><Text variant="ui">Пост не найден</Text></main>;

    const { text, create_date, edit_date } = post.value;
    const dateString = formatPostDate(
        create_date, //? new Date(create_date) : new Date(),
        edit_date // ? new Date(edit_date) : undefined
    );
    return (
        <section class="post-details">
            <time dateTime={create_date?.toISOString()}>{dateString}</time>
            <Markdown content={text} />
            <Button variant="primary" onClick={() => location.route(`/posts/${postId}/edit`)}>Редактировать</Button>
            <Heading level={2} variant="display">Комментарии</Heading>
            <CommentList post_id={postId} />
        </section >
    )
}