import { currentUser } from "@/features/auth";
import { createAsyncAction } from "@/shared/lib/create_async_action";
import type { UUIDv4 } from "@/shared/lib/uuid";
import { signal } from "@preact/signals";

import * as likeApi from '../api/like.api';
import { useEffect } from "preact/hooks";

export function useLikeComment(commentId: UUIDv4, initialLikesCount: number) {
    const liked = signal(false);
    const likesCount = signal(initialLikesCount);

    const toggleAction = createAsyncAction(async () => {
        if (!currentUser.value) return;
        if (liked.value) {
            await likeApi.unlikeComment(commentId);
            liked.value = false;
            likesCount.value--;
        }
        else {
            await likeApi.likeComment(commentId);
            liked.value = true;
            likesCount.value++;
        }
    });

    const fetchStatus = createAsyncAction(likeApi.getCommentLikeStatus);

    useEffect(() => {
        if (!currentUser.value) return;
        fetchStatus.execute(commentId).then(isLiked => {
            if (isLiked !== undefined) liked.value = isLiked;
        });
    }, [commentId])

    return {
        liked,
        likesCount,
        toggle: () => toggleAction.execute(),
        loading: toggleAction.loading,
        disabled: !currentUser.value
    }
}