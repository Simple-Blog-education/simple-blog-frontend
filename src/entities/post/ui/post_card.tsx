import { Heading } from '@/shared/ui';
import type { Post } from '@/entities/post'
import './post_card.css';
import { truncateText } from '@/shared/lib/truncate_text';
import { Text } from '@/shared/ui/text/text';
import { stripMarkdown } from '@/shared/lib/strip_markdown';

export function PostCard({ post }: { post: Post }) {
    // --- Логика дат ---
    const isEdited = post.create_date.getTime() !== post.edit_date.getTime();
    const publishedDate = post.create_date;
    const editedDate = isEdited ? post.edit_date : null;

    const previewText = stripMarkdown(post.text, 150);

    return (
        <article className="post_card">
            <a
                href={`/posts/${post.id}/`}
                aria-label={`Читать пост "${post.header}"`}
            >
                <Heading level={2} bold={true}>{post.header}</Heading>
            </a>

            <Text variant='body'>{previewText}</Text>

            <div className="time_bar">
                <time dateTime={publishedDate.toISOString()}>
                    {publishedDate.toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}
                </time>
                {isEdited && (
                    <>
                        {' · '}
                        <time dateTime={editedDate!.toISOString()}>
                            обновлено{' '}
                            {editedDate!.toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </time>
                    </>
                )}
            </div>
        </article>
    );
}