import { useLocation } from "preact-iso";
import { useDeletePost } from "../hooks/use_delete_post";
import { Button, Text } from "@/shared/ui";
import type { UUIDv4 } from "@/shared/lib/uuid";

export function DeletePostButton({ postId }: { postId: UUIDv4 }) {
    const { removePost, loading, error } = useDeletePost();
    const { route } = useLocation();

    const handleDelete = async () => {
        if (!window.confirm("Вы действительно хотите удалить пост?")) return;
        const ok = await removePost(postId);
        if (ok) {
            route('/');
        }
    }

    return (
        <>
            <Button onClick={handleDelete} loading={loading.value} variant="danger">Удалить</Button>
            {error.value && <Text variant="error">{error.value}</Text>}
        </>
    );
}