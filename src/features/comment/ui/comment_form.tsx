import type { UUIDv4 } from "@/shared/lib/uuid";
import { useState } from "preact/hooks";
import { useCommentForm } from "../hooks/use_comment_form";
import { Button, Text } from "@/shared/ui";
import { Textarea } from "@/shared/ui/textarea/textarea";

import './comment_form.css'

interface CommentFormProps {
    postId: UUIDv4;
    userId: UUIDv4;
}


export function CommentForm({ postId, userId }: CommentFormProps) {
    const [text, setText] = useState('');
    const { createComment, loading, error } = useCommentForm();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        if (!postId || !userId) return;
        await createComment({
            post_id: postId,
            user_id: userId,
            text
        })
    }
    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <Textarea name="commentText" label="Комментарий" value={text} onInput={setText} rows={5} />
            <Button type="submit" loading={loading.value}>Отправить</Button>
            {error.value && <Text variant="error">{error.value}</Text>}
        </form>
    )
}