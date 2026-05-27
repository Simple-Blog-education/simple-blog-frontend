import { Button, Input, Text } from "@/shared/ui";
import { useState } from "preact/hooks";
import { useChangePassword } from "../hooks/use_change_password";

export function ChangePasswordForm() {
    const { submit, loading, error } = useChangePassword();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        await submit({
            old_password: oldPassword,
            new_password: newPassword
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input name="oldPassword" label="Текущий пароль" type="password" value={oldPassword} onInput={setOldPassword} />
            <Input name="newPassword" label="Новый пароль" type="password" value={newPassword} onInput={setNewPassword} />
            <Button type="submit" loading={loading.value}>Сменить</Button>
            {error.value && <Text variant="error">Ошибка смены пароля: {error.value}</Text>}
        </form>
    )
}