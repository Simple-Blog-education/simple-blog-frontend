import type {UUIDv4} from "@/shared/models/uuid.ts";
import {API} from "@/shared/api";
import type { Post } from "@/shared/models/post";

export async function getPostById(id: UUIDv4) {
    let post: Post = await API.get(`posts/${id}`);
    post.create_date = new Date(post.create_date);
    post.edit_date = new Date(post.edit_date);
    return post;
}