import "./header.css"
import { isAuthenticated, logout } from "@/features/auth";
import { AppLink } from "@/shared/ui";
import { Button } from "@/shared/ui";
export function Header() {
    let authorized = isAuthenticated.value;
    return <>
        <header>
            <AppLink href="/" variant="header"><img src="/favicon.svg" height="48" alt="logo" className="logo" /></AppLink>
            <nav>
                {!authorized ? <AppLink href="/auth" variant="header">Авторизация</AppLink> :
                    <>
                        <AppLink href="" variant="header">Профиль</AppLink>
                        <Button onClick={() => {
                            logout();
                            alert("Вы вышли из системы");
                        }}>Выйти</Button>
                    </>}
            </nav>
        </header>
    </>
}