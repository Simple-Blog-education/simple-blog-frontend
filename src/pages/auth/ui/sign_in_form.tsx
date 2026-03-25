import { useState } from "preact/hooks";
import type { ChangeAuthPageFunction } from "./auth_container";

function submit(e: Event) {
    e.preventDefault()
    // make call to api
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