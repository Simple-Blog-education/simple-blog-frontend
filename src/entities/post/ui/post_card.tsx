import { AppLink, Heading } from '@/shared/ui';
import type { Post } from '@/entities/post'
import './post_card.css';
import { Text } from '@/shared/ui/text/text';
import { stripMarkdown } from '@/shared/lib/strip_markdown';
import type { ComponentChildren } from 'preact';
import { UserAvatar } from '@/shared/ui/user_avatar/user_avatar';

export function PostCard({ post, actionsSlot }: { post: Post, actionsSlot?: ComponentChildren }) {
    const isEdited = post.create_date.getTime() !== post.edit_date.getTime();
    const publishedDate = post.create_date;
    const editedDate = isEdited ? post.edit_date : null;

    const previewText = stripMarkdown(post.text, 150);

    return (
        <article className="post_card">
            <AppLink
                href={`/posts/${post.id}/`}
                aria-label={`Читать пост "${post.header}"`}
            >
                <Heading level={2}>{post.header}</Heading>
            </AppLink>

            <Text variant='body'>{previewText}</Text>
            <AppLink className='post_card_author' href={`profile/${post.author_username}`}>
                <UserAvatar user={{ username: post.author_username, avatar_url: post.author_avatar }} />
                <Text variant='ui'>Автор: {post.author_name ?? post.author_username}</Text>
            </AppLink>


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
            <div className="post-footer">
                {actionsSlot}
            </div>
        </article>
    );
}