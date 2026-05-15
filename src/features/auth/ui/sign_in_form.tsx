import { useState } from "preact/hooks";
import type { AuthCredentials } from "../api/auth.api";
import { Button, Input, Text } from "@/shared/ui";

interface SignInFormProps {
    onSubmit: (data: AuthCredentials) => Promise<boolean>;
    onSwitch: () => void;
}

export function SignInForm({ onSubmit, onSwitch }: SignInFormProps) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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

    return (<form onSubmit={handleSubmit}>
        <Input label="Имя пользователя" name="username" value={username} onInput={setUsername} required />
        <Input label="Пароль" name="password" type="password" value={password} onInput={setPassword} showToggle required />
        {error && <p className="error">{error}</p>}
        <Button type="submit" loading={loading}>Войти</Button>
        <Text variant="ui">Нет аккаунта? <Button variant="outline" onClick={onSwitch}>Зарегистрироваться</Button></Text>
    </form>);
}