import { useRef, useState } from "preact/hooks";
import { useUploadAvatar } from "../hooks/use_upload_avatar";
import { currentUser } from "@/features/auth";
import { UserAvatar } from "@/shared/ui/user_avatar/user_avatar";
import { Button } from "@/shared/ui";

export function AvatarUploader() {
    const { upload, loading, error } = useUploadAvatar();

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const user = currentUser.value;

    const handleFileChange = (e: Event) => {
        const file = (e.currentTarget as HTMLInputElement).files?.[0];
        if (!file) return;

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => setPreviewUrl(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        await upload(selectedFile);
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    return (
        <div className="avatar-uploader">
            <div className="avatar-preview">
                {previewUrl ? (
                    <img src={previewUrl} alt={"Предпросмотр"} width={80} height={80} />
                ) : (
                    <UserAvatar user={user} size={80} />
                )}
            </div>
            <input ref={fileInputRef} type="file" accept={"image/*"} onChange={handleFileChange} style={{ display: 'none' }} />
            <Button type="button" onClick={() => fileInputRef.current?.click()}>Выбрать изображение...</Button>
            {
                selectedFile && (
                    <Button type="button" onClick={handleUpload} loading={loading.value}>
                        Загрузить
                    </Button>
                )
            }

            {error.value && <p className={"error"}>{error.value}</p>}
        </div>
    )

}