import type { Comment } from "@/entities/comment";
import type { User } from "@/entities/user";
import { API } from "@/shared/api";
import type { UUIDv4 } from "@/shared/lib/uuid";

interface RawComment {
    id: UUIDv4;
    post_id: UUIDv4;
    user_id: UUIDv4;
    text: string;
    create_date: Date;
}

export async function getComments(post_id: UUIDv4) {
    const rawComments = await API.get<RawComment[]>(`posts/${post_id}/comments`);
    const comments = [];
    for (let rawComment of rawComments) {
        let user = await API.get<User>(`users/${rawComment.user_id}`);
        let comment: Comment = {
            id: rawComment.id,
            post_id: rawComment.post_id,
            user: user,
            text: rawComment.text,
            create_date: new Date(rawComment.create_date)
        }
        comments.push(comment);
    }

    return comments;
}