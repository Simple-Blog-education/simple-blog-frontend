import type { UUIDv4 } from "@/shared/lib/uuid";
import { useLikePost } from "../hooks/use_like_post";
import { LikeButton } from "@/shared/ui/like_button/like_button";

interface PostLikeButtonProps {
    postId: UUIDv4,
    initialLikesCount: number,
}

export function PostLikeButton({ postId, initialLikesCount }: PostLikeButtonProps) {
    const { liked, likesCount, toggle, loading, disabled } = useLikePost(postId, initialLikesCount);

    return (
        <LikeButton
            active={liked.value}
            count={likesCount.value}
            onClick={toggle}
            loading={loading.value}
            disabled={disabled} />
    );
}