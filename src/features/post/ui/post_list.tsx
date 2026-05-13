import { useEffect } from "preact/hooks";
import { usePosts } from "../hooks/usePosts";
import { PostCard } from "@/entities/post";
import './post_list.css'


export function PostList() {
    const { posts, loading, error, loadPosts } = usePosts();
    useEffect(() => { loadPosts(); }, [])

    return (
        <section>
            {loading.value && <p>Загрузка...</p>}
            {error.value && <p className="error">{error.value}</p>}
            <div className="posts">
                {
                    posts.value.map((post) =>
                        <PostCard post={post} />
                    )
                }
            </div>
        </section>
    )
}