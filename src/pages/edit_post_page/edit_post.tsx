import { DeletePostButton } from "@/features/post/ui/post_delete_button";
import { PostForm } from "@/features/post/ui/post_form";
import type { UUIDv4 } from "@/shared/lib/uuid";
import { useRoute } from "preact-iso";

export function EditPostPage() {
    const route = useRoute();
    const postId = route.params.id as UUIDv4;
    return (
        <>
            <DeletePostButton postId={postId} />
            <PostForm postId={postId} />
        </>

    )
}