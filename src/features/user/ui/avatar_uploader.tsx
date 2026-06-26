import { useRef, useState } from "preact/hooks";
import { useUploadAvatar } from "../hooks/use_upload_avatar";
import { currentUser } from "@/features/auth";
import { UserAvatar } from "@/shared/ui/user_avatar/user_avatar";
import { Button, Notification } from "@/shared/ui";

import './avatar_uploader.css';

export function AvatarUploader() {
    const { upload, loading, error } = useUploadAvatar();

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [infoText, setInfoText] = useState('');

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
        if (!error.value) setInfoText('Регистрация успешна, войдите в систему');
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
            <Notification variant="error" text={error.value} />
            <Notification variant="info" text={infoText} />
        </div>
    )

}