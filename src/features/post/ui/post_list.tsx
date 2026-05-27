import { useEffect } from "preact/hooks";
import { usePosts } from "../hooks/use_posts";
import { PostCard } from "@/entities/post";
import './post_list.css'
import { Button } from "@/shared/ui/button/button";


export function PostList() {
    const { posts, loading, error, loadPosts } = usePosts();
    useEffect(() => { loadPosts({ page: 1, perPage: 10 }); }, [])

    return (
        <section className="posts">
            {loading.value && <p>Загрузка...</p>}
            {error.value && <><p className="error">{error.value}</p><Button onClick={() => loadPosts({ page: 1, perPage: 10 })}>Повторить</Button></>}
            {
                posts.value.map((post) =>
                    <PostCard post={post} />
                )
            }
        </section>
    )
}