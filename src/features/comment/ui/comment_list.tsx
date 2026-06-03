import { CommentCard } from "@/entities/comment/ui/comment_card";
import "./comment_list.css"
import { useEffect } from "preact/hooks";
import { useComments } from "../hooks/use_comments";
import type { UUIDv4 } from "@/shared/lib/uuid";
import { Button, Pagination, Text } from "@/shared/ui";
export function CommentList({ post_id }: { post_id: UUIDv4 }) {
    const { comments, pagination, loading, error, goToPage, setPostId } = useComments();
    useEffect(() => { setPostId(post_id) }, [post_id])
    useEffect(() => { goToPage(1); }, [])
    return (
        <div className="comments">
            {loading.value && <Text variant="ui">Загрузка...</Text>}
            {error.value && <><Text className="error">{error.value}</Text><Button onClick={() => goToPage(1)}>Повторить</Button></>}
            {comments.value.length == 0 && <Text variant="ui">Комментариев пока нет!</Text>}
            {
                comments.value.map((comment) => <CommentCard comment={comment} />)
            }
            {pagination.value && (
                <Pagination currentPage={pagination.value.page} total={pagination.value.total} perPage={pagination.value.perPage} onPageChange={goToPage} />
            )}
        </div>
    )
}