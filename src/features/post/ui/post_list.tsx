import { useEffect } from "preact/hooks";
import { usePosts } from "../hooks/use_posts";
import { PostCard } from "@/entities/post";
import './post_list.css'
import { Button } from "@/shared/ui/button/button";
import { Notification, Pagination, SearchBar } from "@/shared/ui";
import { PostLikeButton } from "@/features/like";


export function PostList() {
    const { posts, pagination, loading, error, goToPage, setSearchQuery, getSearchQuery } = usePosts();
    useEffect(() => { goToPage(1); }, [])
    const currentSearch = getSearchQuery() ?? '';
    return (
        <section className="posts">
            {loading.value && <p>Загрузка...</p>}
            {error.value && <><Notification variant="error" text={error.value} /><Button onClick={() => goToPage(pagination.value?.page ?? 1)}>Повторить</Button></>}
            {
                <SearchBar initialValue={currentSearch} onSearch={(query: string) => setSearchQuery(query)} />
            }
            {
                posts.value.map((post) =>
                    <PostCard post={post} actionsSlot={
                        <PostLikeButton postId={post.id} initialLikesCount={post.likes} />
                    } />
                )
            }
            {pagination.value && (
                <Pagination currentPage={pagination.value.page} total={pagination.value.total} perPage={pagination.value.perPage} onPageChange={goToPage} />
            )}
        </section>
    )
}