import { useState } from "preact/hooks";
import type { ChangeAuthPageFunction } from "./auth_container";

function submit(e: Event) {
    e.preventDefault();
    // make call to api
}

export function SignUpForm({changeCallback}:{changeCallback: ChangeAuthPageFunction}) {

    const [showPassword, setShowPassword] = useState(false);

    return (<form onSubmit={submit}>
        <label htmlFor={"username"}>Имя пользователя</label>
        <input type="text" placeholder={"Имя пользователя"} name={"username"}/>
        <label htmlFor={"email"}>Эл. почта</label>
        <input type="email" name="email" placeholder={"example@mail.com"}/>
        <label htmlFor="password">Пароль</label>
        <input type="password" name="password"/>
        <label htmlFor="repeatPassword">Повторите пароль</label>
        <input type="password" name="repeatPassword" />
        <a class={"display"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Показать' : 'Скрыть'} пароль</a>
        <button type={"submit"}>Зарегистрироваться</button>
        <p>Есть аккаунт? <a class={"display"} onClick={changeCallback}>Войти</a></p>
    </form>);
}