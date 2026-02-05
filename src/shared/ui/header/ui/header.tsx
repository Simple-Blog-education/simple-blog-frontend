import { useLocation } from "preact-iso";
import "./header.css"
export function Header() {
    const location = useLocation();
    let authorized = true;
    return <>
        <header>
            <a href="/"><img src="/favicon.svg" height="48" alt="logo" className="logo"/></a>
            <nav>
                {authorized ? <button onClick={() => {location.route("/auth")}}>Авторизация</button> : 
                <>
                    <a href="">Профиль</a>
                    <a onClick={() => {
                        authorized = false;
                        alert("Вы вышли из системы");
                    }}>Выйти</a>
                </>}
            </nav>
        </header>
    </>
}