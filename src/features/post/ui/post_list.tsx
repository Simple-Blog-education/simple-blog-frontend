import { useEffect } from "preact/hooks";
import { usePosts } from "../hooks/use_posts";
import { PostCard } from "@/entities/post";
import './post_list.css'
import { Button } from "@/shared/ui/button/button";
import { Pagination } from "@/shared/ui";


export function PostList() {
    const { posts, pagination, loading, error, goToPage } = usePosts();
    useEffect(() => { goToPage(1); }, [])
    return (
        <section className="posts">
            {loading.value && <p>Загрузка...</p>}
            {error.value && <><p className="error">{error.value}</p><Button onClick={() => goToPage(pagination.value?.page ?? 1)}>Повторить</Button></>}
            {
                posts.value.map((post) =>
                    <PostCard post={post} />
                )
            }
            {pagination.value && (
                <Pagination currentPage={pagination.value.page} total={pagination.value.total} perPage={pagination.value.perPage} onPageChange={goToPage} />
            )}
        </section>
    )
}