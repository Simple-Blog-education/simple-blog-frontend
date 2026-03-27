import { useState } from "preact/hooks";
import type { ChangeAuthPageFunction } from "./auth_container";
import { signIn } from "../api/auth";

function submit(e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    signIn({
        username: formData.get("username")!.toString(),
        password: formData.get("password")!.toString()
    });
}

export function SignInForm({changeCallback}:{changeCallback: ChangeAuthPageFunction}) {

    const [showPassword, setShowPassword] = useState(false);

    return (<form onSubmit={submit}>
        <div className="input-container">
            <label for={"username"}>Имя пользователя</label>
            <input type="text" id={"username"} name={"username"}/>
        </div>
        <div className="input-container">
            <label for="password">Пароль</label>
            <input type={showPassword ? "text" : "password"} id={"password"} name={"password"}/>
        </div>
        <a class={"display"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Скрыть' : 'Показать'} пароль</a>
        <button type={"submit"}>Войти</button>
        <p class="display">Нет аккаунта? <a class="display" onClick={changeCallback}>Зарегистрироваться</a></p>
    </form>);
}