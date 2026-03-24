import { useState } from "preact/hooks";
import type { ChangeAuthPageFunction } from "./auth_container";

function submit(e: Event) {
    e.preventDefault()
    // make call to api
}

export function SignInForm({changeCallback}:{changeCallback: ChangeAuthPageFunction}) {

    const [showPassword, setShowPassword] = useState(false);

    return (<form onSubmit={submit}>
        <label htmlFor={"username"}>Имя пользователя</label>
        <input type="text" name={"username"} placeholder="Имя пользователя"/>
        <label htmlFor="password">Пароль</label>
        <input type={showPassword ? "text" : "password"} name={"password"} placeholder="Пароль"/>
        <a class={"display"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Показать' : 'Скрыть'} пароль</a>
        <button type={"submit"}>Войти</button>
        <p>Нет аккаунта? <a class="display" onClick={changeCallback}>Зарегистрироваться</a></p>
    </form>);
}