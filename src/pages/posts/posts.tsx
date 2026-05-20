import { Heading } from '@/shared/ui/heading/heading';
import { PostList } from "@/features/post/ui/post_list";
import './posts.css'
import { Button } from '@/shared/ui';
import { useLocation } from 'preact-iso';
export function Posts() {
    const location = useLocation();
    return (
        <>
            <Heading level={1} bold={true} variant='display'>Все посты</Heading>
            <Button variant='primary' onClick={() => location.route('/posts/new')}>Новый пост</Button>
            <PostList />
        </>
    );
}