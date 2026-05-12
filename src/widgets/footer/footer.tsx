import './footer.css'

export function Footer() {
    return <>
        <footer>
            <div class="footer__socials">
                <a href="https://t.me/icy0o"><img src="/assets/telegram.png" alt="Telegram" /></a>
                <a href="https://github.com/icy-develop"><img src="/assets/github.png" alt="Github" /></a>
            </div>
            <select name="theme" id="theme">
                <option value="light">Светлая</option>
                {/* <option value="dark">Темная</option> */}
            </select>
            <nav class="footer__navigation">
                <a href="/about">О проекте</a>
                <a href="/">Все посты</a>
            </nav>
            <p class="footer__author">icy0o, 2026</p>
        </footer>
    </>
}