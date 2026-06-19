import type { UUIDv4 } from "@/shared/lib/uuid";
import { LikeButton } from "@/shared/ui/like_button/like_button";
import { useLikeComment } from "../hooks/use_like_comment";

interface CommentLikeButtonProps {
    commentId: UUIDv4,
    initialLikesCount: number,
}

export function CommentLikeButton({ commentId, initialLikesCount }: CommentLikeButtonProps) {
    const { liked, likesCount, toggle, loading, disabled } = useLikeComment(commentId, initialLikesCount);

    return (
        <LikeButton
            active={liked.value}
            count={likesCount.value}
            onClick={toggle}
            loading={loading.value}
            disabled={disabled} />
    );
}