import { API } from "@/shared/api";
import type { NewPost, Post } from "@/entities/post";
import type { UUIDv4 } from "@/shared/lib/uuid";
import type { PostChangeset, PostPaginatedResponse } from "@/entities/post/model/post.types";

export interface PostSearchParams {
    page: number,
    perPage: number,
    query?: string
}

export async function getPosts(params: PostSearchParams) {
    let posts: PostPaginatedResponse = await API.get<PostPaginatedResponse>("posts", {
        params: { page: params.page, per_page: params.perPage, query: params.query }
    })
    for (let post of posts.data) {
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
    });
}

export async function deletePost(id: UUIDv4) {
    return await API.delete<boolean>(`posts/${id}`);
}