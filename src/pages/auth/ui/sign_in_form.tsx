import { useState } from "preact/hooks";
import type { ChangeAuthPageFunction } from "./auth_container";
import { signIn } from "../api/auth";
import { useLocation } from "preact-iso";

export function SignInForm({changeCallback}:{changeCallback: ChangeAuthPageFunction}) {

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        try {
            const success = await signIn({
                username: formData.get("username")!.toString(),
                password: formData.get("password")!.toString()
            });
            if (success) {
                location.route("/");
            } else {
                setError("Неверное имя пользователя или пароль");
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
            <input type="text" id="username" name="username"/>
        </div>
        <div className="input-container">
            <label htmlFor="password">Пароль</label>
            <input type={showPassword ? "text" : "password"} id="password" name="password"/>
        </div>
        <a className="display" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Скрыть' : 'Показать'} пароль</a>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? "Вход..." : "Войти"}</button>
        <p className="display">Нет аккаунта? <a className="display" onClick={changeCallback}>Зарегистрироваться</a></p>
    </form>);
}