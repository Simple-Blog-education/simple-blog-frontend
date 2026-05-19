import { useState } from "preact/hooks";
import { type SignUpData } from "@/features/auth/api/auth.api";
import { Button, Checkbox, Input, Text } from "@/shared/ui";
import { usePasswordVisibility } from "../hooks/use_password_visibility";

interface SignUpFormProps {
    onSubmit: (data: SignUpData) => Promise<boolean>;
    onSwitch: () => void;
}

export function SignUpForm({ onSubmit, onSwitch }: SignUpFormProps) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { visible, toggle } = usePasswordVisibility(false);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const password = formData.get("password")!.toString();
        const repeatPassword = formData.get("repeatPassword")!.toString();

        if (password !== repeatPassword) {
            setError("Пароли не совпадают");
            return;
        }

        setLoading(true);
        try {
            const result = await onSubmit({ username, email, password, repeatPassword });
            if (!result) {
                setError('Ошибка регистрации. Возможно, имя пользователя или почта уже заняты.');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка');
        } finally {
            setLoading(false);
        }
    };

    return (<form onSubmit={handleSubmit}>
        <Input label="Имя пользователя" name="username" value={username} onInput={setUsername} required />
        <Input label="Эл. почта" name="email" type="email" value={email} onInput={setEmail} required />
        <Input label="Пароль" name="password" type="password" value={password} onInput={setPassword} visible={visible} required />
        <Input label="Повторите пароль" name="repeatPassword" type="password" value={repeatPassword} onInput={setRepeatPassword} visible={visible} required />
        <Checkbox label="Показать пароль" name="showPassword" checked={visible} onChange={toggle} />
        {error && <p className="error">{error}</p>}
        <Button type="submit" loading={loading}>Зарегистрироваться</Button>
        <Text variant="ui">Есть аккаунт? <Button variant="outline" onClick={onSwitch}>Войти</Button></Text>
    </form>);
}