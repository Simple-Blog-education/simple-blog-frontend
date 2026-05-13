import { useEffect } from "preact/hooks";
import { usePosts } from "../hooks/usePosts";
import { PostCard } from "@/entities/post";
import './post_list.css'
import { Button } from "@/shared/ui/button/button";


export function PostList() {
    const { posts, loading, error, loadPosts } = usePosts();
    useEffect(() => { loadPosts(); }, [])

    return (
        <section>
            {loading.value && <p>Загрузка...</p>}
            {error.value && <><p className="error">{error.value}</p><Button onClick={() => loadPosts()}>Повторить</Button></>}
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