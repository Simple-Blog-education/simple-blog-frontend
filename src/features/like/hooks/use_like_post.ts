import { currentUser } from "@/features/auth";
import { createAsyncAction } from "@/shared/lib/create_async_action";
import type { UUIDv4 } from "@/shared/lib/uuid";
import { signal, useSignal } from "@preact/signals";

import * as likeApi from '../api/like.api';
import { useEffect } from "preact/hooks";

export function useLikePost(postId: UUIDv4, initialLikesCount: number) {
    const liked = useSignal(false);
    const likesCount = useSignal(initialLikesCount);

    const toggleAction = createAsyncAction(async () => {
        if (!currentUser.value) return;
        console.log("liked value: " + liked.value);
        if (liked.value) {
            await likeApi.unlikePost(postId);
            liked.value = false;
            likesCount.value--;
        }
        else {
            await likeApi.likePost(postId);
            liked.value = true;
            likesCount.value++;
        }
    });

    const fetchStatus = createAsyncAction(likeApi.getPostLikeStatus);

    useEffect(() => {
        if (!currentUser.value) return;
        fetchStatus.execute(postId).then(isLiked => {
            console.log(isLiked);
            if (isLiked !== undefined) liked.value = isLiked;
        });
    }, [postId])

    return {
        liked,
        likesCount,
        toggle: () => toggleAction.execute(),
        loading: toggleAction.loading,
        disabled: !currentUser.value
    }
}