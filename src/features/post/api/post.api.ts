import { API } from "@/shared/api";
import type { Post } from "@/entities/post";
import type { UUIDv4 } from "@/shared/lib/uuid";

export async function getPosts() {
    let posts: Array<Post> = await API.get<Post[]>("posts/all")
    for (let post of posts) {
        post.create_date = new Date(post.create_date);
        post.edit_date = new Date(post.edit_date);
    }
    return posts;
}

export async function getPostById(id: UUIDv4) {
    let post: Post = await API.get(`posts/${id}`);
    post.create_date = new Date(post.create_date);
    post.edit_date = new Date(post.edit_date);
    return post;
}