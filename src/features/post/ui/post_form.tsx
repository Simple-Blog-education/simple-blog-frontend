import type { UUIDv4 } from "@/shared/lib/uuid";
import { useLocation, useRoute } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { usePostForm } from "../hooks/use_post_form";
import { currentUser } from "@/features/auth";
import { Text } from "@/shared/ui";

export function PostForm() {
    const location = useLocation();
    const route = useRoute();
    const postId = route.params.id as UUIDv4;
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
        let success = false;
        if (postId) {
            const post = await submit({ header: title, text: content, user_id: currentUser.value!.id });
            if (post) success = true;
        }
        else {
            const post = await update({ id: postId, header: title, text: content });
            if (post) success = true;
        }
        if (success) {
            location.route(`/posts/${postId}`);
        }
    };

    if (isFetching.value) return <Text variant="ui">Загрузка поста...</Text>
    return (
        <Text>HEHE</Text>
    )
}