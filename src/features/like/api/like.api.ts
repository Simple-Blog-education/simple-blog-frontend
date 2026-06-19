import { currentUser } from "@/features/auth";
import { API } from "@/shared/api";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import type { UUIDv4 } from "@/shared/lib/uuid";

export async function getPostLikeStatus(postId: UUIDv4): Promise<boolean> {
    if (!currentUser.value) return false;
    const result = await API.get(
        API_ENDPOINTS.likes.postIsLiked(currentUser.value.id, postId)
    );
    return result
}

export async function likePost(postId: UUIDv4): Promise<void> {
    if (!currentUser.value) throw new Error("Пользователь не авторизован");
    await API.post(API_ENDPOINTS.likes.likePost(currentUser.value.id, postId));
}

export async function unlikePost(postId: UUIDv4): Promise<void> {
    if (!currentUser.value) throw new Error("Пользователь не авторизован");
    await API.delete(API_ENDPOINTS.likes.unlikePost(currentUser.value.id, postId));
}

// Комментарии

export async function getCommentLikeStatus(commentId: UUIDv4): Promise<boolean> {
    if (!currentUser.value) return false;
    const result = await API.get(API_ENDPOINTS.likes.commentIsLiked(currentUser.value.id, commentId));
    return result;
}

export async function likeComment(commentId: UUIDv4): Promise<void> {
    if (!currentUser.value) throw new Error("Пользователь не авторизован");
    await API.post(API_ENDPOINTS.likes.likeComment(currentUser.value.id, commentId));
}

export async function unlikeComment(commentId: UUIDv4): Promise<void> {
    if (!currentUser.value) throw new Error("Пользователь не авторизован");
    await API.delete(API_ENDPOINTS.likes.unlikeComment(currentUser.value.id, commentId));
}