import './footer.css'

export function Footer() {
    return <>
        <footer>
            <div class="footer__socials">
                <a><img src="" alt="Telegram" /></a>
                <a><img src="" alt="Reddit" /></a>
            </div>
            <select name="theme" id="theme">
                <option value="light">Светлая</option>
                {/* <option value="dark">Темная</option> */}
            </select>
            <nav class="footer__navigation">
                <a href="/about">О проекте</a>
                <a href="/">Все посты</a>
            </nav>
        </footer>
    </>
}