import { API } from "@/shared/api";
import type { NewPost, Post } from "@/entities/post";
import type { UUIDv4 } from "@/shared/lib/uuid";
import type { PostChangeset } from "@/entities/post/model/post.types";

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

export async function createPost(data: NewPost) {
    let success = await API.post<NewPost>(`posts/new`, data);
    return success;
}

export async function updatePost(changeset: PostChangeset) {
    return await API.put<PostChangeset>(`posts/${changeset.id}`, {
        header: changeset.header,
        text: changeset.text
    })
}