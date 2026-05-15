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
                <AppLink variant='panel' href="https://t.me/icy0o"><img src="/assets/telegram.png" alt="Telegram" /></AppLink>
                <AppLink variant='panel' href="https://github.com/icy-develop"><img src="/assets/github.png" alt="Github" /></AppLink>
            </div>
            <Select name='theme' id='theme' options={options}></Select>
            <nav class="footer__navigation">
                <AppLink variant='panel' href="/about">О проекте</AppLink>
                <AppLink variant='panel' href="/">Все посты</AppLink>
            </nav>
            <Text className="footer__author">icy0o, 2026</Text>
        </footer>
    </>
}