import { Button, Input, Notification } from "@/shared/ui";
import { useState } from "preact/hooks";
import { useChangePassword } from "../hooks/use_change_password";

import './change_password_form.css';

export function ChangePasswordForm() {
    const { submit, loading, error } = useChangePassword();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [infoText, setInfoText] = useState('');

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        await submit({
            old_password: oldPassword,
            new_password: newPassword
        });
        if (!error.value) setInfoText("Пароль успешно изменен");
        setNewPassword('');
        setOldPassword('');
    }

    return (
        <form className={"change-password-form"} onSubmit={handleSubmit}>
            <Input name="oldPassword" label="Текущий пароль" type="password" value={oldPassword} onInput={setOldPassword} />
            <Input name="newPassword" label="Новый пароль" type="password" value={newPassword} onInput={setNewPassword} />
            <Button type="submit" loading={loading.value}>Сменить</Button>
            <Notification variant="info" text={infoText} />
            <Notification variant="error" text={error.value ? "Ошибка смены пароля: " + error.value : ''} />
            {/* {error.value && <Text variant="error">Ошибка смены пароля: {error.value}</Text>} */}
        </form>
    )
}