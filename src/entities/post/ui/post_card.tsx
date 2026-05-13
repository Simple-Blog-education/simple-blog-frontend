import type { Post } from "@/entities/post";
import './post_card.css';
import { Heading } from "@/shared/ui/heading/heading";
export function PostCard({ post }: { post: Post }) {
    let editDateString = post.create_date.getTime() == post.edit_date.getTime() ? '' : ` (обновлен: ${post.edit_date.toLocaleString()})`
    return (
        <div className="post_card">
            <a class="display" href={`/posts/${post.id}/`}><Heading bold={true} level={2}>{post.header}</Heading></a>
            <p>{post.text.substring(0, 99) + (post.text.length <= 100 ? "" : "...")}</p>
            <p>Дата публикации: {post.edit_date.toLocaleString()}{editDateString}</p>
        </div>
    );
}