import { useLocation } from "preact-iso";
import "./header.css"
import { isAuthenticated, logout } from "@/features/auth/model/auth.store";
export function Header() {
    const location = useLocation();
    let authorized = isAuthenticated.value;
    return <>
        <header>
            <a href="/"><img src="/favicon.svg" height="48" alt="logo" className="logo"/></a>
            <nav>
                {!authorized ? <button onClick={() => {location.route("/auth")}}>Авторизация</button> : 
                <>
                    <a href="">Профиль</a>
                    <a onClick={() => {
                        logout();
                        alert("Вы вышли из системы");
                    }}>Выйти</a>
                </>}
            </nav>
        </header>
    </>
}