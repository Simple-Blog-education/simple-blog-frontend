import type {Post} from "@/shared/models/post.ts";
import './post_item.css';
export function PostItem({post}: {post: Post}) {
    return (
        <div className="post_item">
            <a class="display" href={`/posts/${post.id}/`}><h1 class="display">{post.header}</h1></a>
            <p>{post.text.substring(0,99) + (post.text.length <= 100 ? "" : "...")}</p>
            <p>Создан: {post.edit_date.toString()}</p>
            <p>Обновлен: {post.edit_date.toString()}</p>
        </div>
    );
}