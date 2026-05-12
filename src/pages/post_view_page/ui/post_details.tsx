import {useEffect, useState} from "preact/hooks";
import type {Post} from "@/entities/post/model/post.types";
import {getPostById} from "../api/get_post_by_id";
import {useRoute} from "preact-iso";
import type {UUIDv4} from "@/shared/lib/uuid";
import './post_details.css'

export function PostDetails() {
    const [post, setPost] = useState<Post>({} as Post);
    const route = useRoute();
    useEffect(() => {
        getPostById(route.params.id as UUIDv4).then((post) => setPost(post))
    }, [])
    const postDate = `${post.create_date?.toLocaleString() ?? ''}` + (post.create_date?.getTime() == post.edit_date?.getTime() ? '' : ` (изменено: ${post.edit_date?.toLocaleString() ?? ''})`)
    return (
        <main class={`post-details`}>
            <h1>{post.header}</h1>
            <p>{post.text?.toString() ?? ''}</p>
            <p>Дата публикации: {postDate} </p>
            <p>{}</p>
        </main>
    )
}