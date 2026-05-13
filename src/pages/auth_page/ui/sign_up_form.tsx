import { useState } from "preact/hooks";
import type { ChangeAuthPageFunction } from "./auth_container";
import { signUp } from "@/features/auth/api/auth.api";

export function SignUpForm({ changeCallback }: { changeCallback: ChangeAuthPageFunction }) {

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setError(null);
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
            const success = await signUp({
                username: formData.get("username")!.toString(),
                email: formData.get("email")!.toString(),
                password: password
            });
            if (success) {
                changeCallback(); // переключаем на вход только при успехе
            } else {
                setError("Ошибка регистрации. Возможно, имя пользователя или почта уже заняты.");
            }
        } catch (err) {
            setError("Ошибка соединения с сервером");
        } finally {
            setLoading(false);
        }
    };

    return (<form onSubmit={handleSubmit} method="post">
        <div className="input-container">
            <label htmlFor="username">Имя пользователя</label>
            <input type="text" placeholder="Имя пользователя уникально" name="username" id="username" />
        </div>
        <div className="input-container">
            <label htmlFor="email">Эл. почта</label>
            <input type="email" name="email" placeholder="example@mail.com" id="email" />
        </div>
        <div className="input-container">
            <label for="password">Пароль</label>
            <input type={showPassword ? "text" : "password"} name="password" id="password" />
        </div>
        <div className="input-container">
            <label for="repeatPassword">Повторите пароль</label>
            <input type={showPassword ? "text" : "password"} name="repeatPassword" id="repeatPassword" />
        </div>
        <a className="display" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Скрыть' : 'Показать'} пароль</a>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? "Регистрация..." : "Зарегистрироваться"}</button>
        <p className="display">Есть аккаунт? <a className="display" onClick={changeCallback}>Войти</a></p>
    </form>);
}