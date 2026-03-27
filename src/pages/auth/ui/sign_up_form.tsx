import { useState } from "preact/hooks";
import type { ChangeAuthPageFunction } from "./auth_container";
import { signUp } from "../api/auth";

function submit(e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    signUp({
        username: formData.get("username")!.toString(),
        email: formData.get("email")!.toString(),
        password: formData.get("password")!.toString()
    })
}

export function SignUpForm({changeCallback}:{changeCallback: ChangeAuthPageFunction}) {

    const [showPassword, setShowPassword] = useState(false);

    return (<form onSubmit={submit}>
        <div className="input-container">
            <label for={"username"}>Имя пользователя</label>
            <input type="text" placeholder={"Имя пользователя уникально"} name={"username"} id={"username"}/>
        </div>
        <div className="input-container">
            <label for={"email"}>Эл. почта</label>
            <input type="email" name="email" placeholder={"example@mail.com"} id={"email"}/>
        </div>
        <div className="input-container">
            <label for="password">Пароль</label>
            <input type={showPassword ? "text" : "password"} name="password" id={"password"}/>
        </div>
        <div className="input-container">
            <label for="repeatPassword">Повторите пароль</label>
            <input type={showPassword ? "text" : "password"} name="repeatPassword" id={"repeatPassword"} />
        </div>
        <a class={"display"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Скрыть': 'Показать'} пароль</a>
        <button type={"submit"}>Зарегистрироваться</button>
        <p class="display">Есть аккаунт? <a class={"display"} onClick={changeCallback}>Войти</a></p>
    </form>);
}