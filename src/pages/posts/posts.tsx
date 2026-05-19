import { Heading } from '@/shared/ui/heading/heading';
import { PostList } from "@/features/post/ui/post_list";
import './posts.css'
export function Posts() {
    return (
        <>
            <Heading level={1} variant='display'>Все посты</Heading>
            <PostList />
        </>
    );
}