import { CommentCard } from "@/entities/comment/ui/comment_card";
import "./comment_list.css"
import { useEffect } from "preact/hooks";
import { useComments } from "../hooks/use_comments";
import type { UUIDv4 } from "@/shared/lib/uuid";
import { Button, Pagination, Text } from "@/shared/ui";
import { CommentLikeButton } from "@/features/like";
export function CommentList({ post_id, user_id }: { post_id?: UUIDv4, user_id?: UUIDv4 }) {
    if (!post_id && !user_id) return <Text>Ошибка загрузки списка комментариев</Text>
    const { comments, pagination, loading, error, goToPage, setPostId, setUserId } = useComments();
    useEffect(() => {
        if (post_id && user_id) {
            setPostId(post_id)
            setUserId(user_id)
        }
        else if (post_id && !user_id) {
            setPostId(post_id)
            setUserId(undefined);
        }
        else if (user_id && !post_id) {
            setUserId(user_id);
            setPostId(undefined);
        }
    }, [post_id, user_id])
    useEffect(() => { goToPage(1); }, [])
    return (
        <div className="comments">
            {loading.value && <Text variant="ui">Загрузка...</Text>}
            {error.value && <><Text className="error">{error.value}</Text><Button onClick={() => goToPage(1)}>Повторить</Button></>}
            {comments.value.length == 0 && <Text variant="ui">Комментариев пока нет!</Text>}
            {
                comments.value.map((comment) => <CommentCard comment={comment} actionsSlot={
                    <CommentLikeButton commentId={comment.id} initialLikesCount={comment.likes} />
                } />)
            }
            {pagination.value && (
                <Pagination currentPage={pagination.value.page} total={pagination.value.total} perPage={pagination.value.perPage} onPageChange={goToPage} />
            )}
        </div>
    )
}