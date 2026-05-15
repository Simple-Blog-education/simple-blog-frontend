import { isAuthenticated, logout } from "@/features/auth";
import { AppLink } from "@/shared/ui";
import { Button } from "@/shared/ui";
import "./header.css"
export function Header() {
    let authorized = isAuthenticated.value;
    return <>
        <header>
            <AppLink href="/" variant="panel"><img src="/favicon.svg" height="48" alt="logo" className="logo" /></AppLink>
            <nav>
                {!authorized ? <AppLink href="/auth" variant="panel">Авторизация</AppLink> :
                    <>
                        <AppLink href="" variant="panel">Профиль</AppLink>
                        <Button onClick={() => {
                            logout();
                            alert("Вы вышли из системы");
                        }}>Выйти</Button>
                    </>}
            </nav>
        </header>
    </>
}