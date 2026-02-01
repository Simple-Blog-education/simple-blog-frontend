import {get_posts} from "../api/get_posts.ts";
import {PostItem} from "@/pages/posts/ui/post_item.tsx";
import type {Post} from "@/shared/models/post.ts";
import {useEffect, useState} from "preact/hooks";
import './posts.css';
export function Posts() {
    const [posts, setPosts] = useState<Post[] | undefined>([]);
    useEffect( () =>{
        get_posts().then(
            (posts) => setPosts(posts),
        )
    }, [])
    return (
        <>
            <h1>Все посты</h1>
            {posts === undefined || posts.length === 0 ? <p>Loading...</p> :
            <section class="posts-section">
                {/* <input placeholder="Search..."/> */}
                {posts.map((post: Post) => <PostItem post={post}></PostItem>)}
            </section>}
        </>
    );
}