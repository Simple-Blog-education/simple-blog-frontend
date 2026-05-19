import { Text } from "@/shared/ui";
import './comment_card.css'
import type { Comment } from "../model/comment.types";
export function CommentCard({ comment }: { comment: Comment }) {
    return (
        <div className="comment-card">
            <Text variant="ui">{comment.user.username}</Text>
            <Text variant="ui-thin">{comment.text}</Text>
        </div>
    );
}