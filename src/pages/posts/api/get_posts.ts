import {API} from "@/shared/api";
import type { Post } from "@/shared/models/post";

export async function get_posts() {
    let posts: Array<Post> = await API.get("posts/all")
    for(let post of posts) {
        post.create_date = new Date(post.create_date);
        post.edit_date = new Date(post.edit_date);
    }
    return posts;
}