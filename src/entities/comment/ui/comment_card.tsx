import { Text } from "@/shared/ui";
import './comment_card.css'
import type { Comment } from "../model/comment.types";
import { formatCommentDate } from "@/shared/lib/format_post_date";
import type { ComponentChildren } from "preact";
export function CommentCard({ comment, actionsSlot }: { comment: Comment, actionsSlot?: ComponentChildren }) {
    let localDate = formatCommentDate(comment.create_date)
    return (
        <div className="comment-card">
            <Text variant="ui">{comment.username}</Text>
            <Text variant="ui-thin">{comment.text}</Text>
            <Text variant="code" className="date">{localDate}</Text>
            <div className="comment-footer">
                {actionsSlot}
            </div>
        </div>
    );
}