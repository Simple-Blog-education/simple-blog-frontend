import { Text } from "@/shared/ui";
import './comment_card.css'
import type { Comment } from "../model/comment.types";
import { formatCommentDate } from "@/shared/lib/format_post_date";
export function CommentCard({ comment }: { comment: Comment }) {
    let localDate = formatCommentDate(comment.create_date)
    return (
        <div className="comment-card">
            <Text variant="ui">{comment.username}</Text>
            <Text variant="ui-thin">{comment.text}</Text>
            <Text variant="code" className="date">{localDate}</Text>
        </div>
    );
}