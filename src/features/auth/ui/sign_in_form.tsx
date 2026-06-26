import { useState } from "preact/hooks";
import type { AuthCredentials } from "../api/auth.api";
import { Button, Checkbox, Input, Text, Notification } from "@/shared/ui";
import { usePasswordVisibility } from "../hooks/use_password_visibility";

interface SignInFormProps {
    onSubmit: (data: AuthCredentials) => Promise<boolean>;
    onSwitch: () => void;
}

export function SignInForm({ onSubmit, onSwitch }: SignInFormProps) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { visible, toggle } = usePasswordVisibility(false);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const result = await onSubmit({ username, password });
            if (!result) {
                setError('Неверное имя пользователя или пароль');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка');
        } finally {
            setLoading(false);
        }
    };

    return (<form className="auth-form" onSubmit={handleSubmit}>
        <Input label="Имя пользователя" name="username" value={username} onInput={setUsername} required />
        <Input label="Пароль" name="password" type="password" value={password} onInput={setPassword} visible={visible} required />
        <Checkbox label="Показать пароль" name="showPassword" checked={visible} onChange={toggle} />
        <Notification variant="error" text={error} />
        <Button type="submit" loading={loading}>Войти</Button>
        <Text variant="ui">Нет аккаунта? <Button variant="outline" onClick={onSwitch}>Зарегистрироваться</Button></Text>
    </form>);
}