import type { UUIDv4 } from "@/shared/lib/uuid";
import { useLocation } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { usePostForm } from "../hooks/use_post_form";
import { currentUser } from "@/features/auth";
import { Button, Input, Markdown, Text } from "@/shared/ui";

import './post_form.css'
import { Textarea } from "@/shared/ui/textarea/textarea";

interface PostFormProps {
    postId: UUIDv4 | null
}

export function PostForm({ postId }: PostFormProps) {
    const location = useLocation();
    const { submit, update, loading, error, initialData, isFetching } = usePostForm(postId);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (initialData.value) {
            setTitle(initialData.value.header);
            setContent(initialData.value.text);
        }
        else {
            setTitle('');
            setContent('');
        }
    }, [initialData.value])

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        if (!postId || !currentUser.value) {
            const post = await submit({ header: title, text: content, user_id: currentUser.value!.id });
            if (post) location.route("/")
        }
        else if (postId) {
            const post = await update({ id: postId, header: title, text: content });
            if (post) location.route(`/posts/${postId}`);
        }
    };
    if (isFetching.value) return <Text variant="ui">Загрузка поста...</Text>
    return (
        <form className="post-form" onSubmit={handleSubmit}>
            <Input label="Заголовок" value={title} onInput={setTitle} required />
            <div className="editor">
                <Textarea name="editor-textarea" value={content} onInput={setContent} required />
                <Markdown content={content} previewMode={true} />
            </div>
            {error.value && <Text className="error">{error.value}</Text>}
            <Button type="submit" loading={loading.value}>
                {postId ? "Сохранить" : "Опубликовать"}
            </Button>
        </form>
    )
}