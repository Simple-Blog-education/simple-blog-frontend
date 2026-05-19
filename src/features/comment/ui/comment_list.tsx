import { CommentCard } from "@/entities/comment/ui/comment_card";
import "./comment_list.css"
import { useEffect } from "preact/hooks";
import { useComments } from "../hooks/useComments";
import type { UUIDv4 } from "@/shared/lib/uuid";
import { Button, Text } from "@/shared/ui";
export function CommentList({ post_id }: { post_id: UUIDv4 }) {
    const { comments, loading, error, loadComments } = useComments();
    useEffect(() => { loadComments(post_id); }, [])
    return (
        <div className="comments">
            {loading.value && <Text variant="ui">Загрузка...</Text>}
            {error.value && <><Text className="error">{error.value}</Text><Button onClick={() => loadComments(post_id)}>Повторить</Button></>}
            {comments.value.length == 0 && <Text variant="ui">Комментариев пока нет!</Text>}
            {
                comments.value.map((comment) => <CommentCard comment={comment} />)
            }
        </div>
    )
}