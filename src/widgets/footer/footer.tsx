import { AppLink, type SelectOption } from '@/shared/ui'
import { Text } from '@/shared/ui'
import { Select } from '@/shared/ui'
import './footer.css'

export function Footer() {
    const options: SelectOption[] = [
        {
            label: "Светлая",
            value: "light"
        }];
    return <>
        <footer>
            <div class="footer__socials">
                <AppLink href="https://t.me/icy0o"><img src="/assets/telegram.png" alt="Telegram" /></AppLink>
                <AppLink href="https://github.com/icy-develop"><img src="/assets/github.png" alt="Github" /></AppLink>
            </div>
            <Select name='theme' id='theme' options={options}></Select>
            <select name="theme" id="theme">
                <option value="light">Светлая</option>
                {/* <option value="dark">Темная</option> */}
            </select>
            <nav class="footer__navigation">
                <AppLink href="/about">О проекте</AppLink>
                <AppLink href="/">Все посты</AppLink>
            </nav>
            <Text className="footer__author">icy0o, 2026</Text>
        </footer>
    </>
}