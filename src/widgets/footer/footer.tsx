import { AppLink, type SelectOption } from '@/shared/ui'
import { Text } from '@/shared/ui'
import { Select } from '@/shared/ui'
import './footer.css'
import { useTheme, type Theme } from '@/shared/hooks/useTheme'

export function Footer() {

    const { theme, setTheme } = useTheme();
    const options: SelectOption[] = [
        {
            label: "Системная",
            value: "system"
        },
        {
            label: "Светлая",
            value: "light"
        },
        {
            label: "Темная",
            value: "dark"
        }
    ];
    return <>
        <footer>
            <div class="footer__socials">
                <AppLink variant='panel' href="https://t.me/icy0o"><img src="/assets/telegram.png" alt="Telegram" /></AppLink>
                <AppLink variant='panel' href="https://github.com/icy-develop"><img src="/assets/github.png" alt="Github" /></AppLink>
            </div>
            <div className="footer__theme">
                <Text variant='panel'>Тема</Text>
                <Select name='theme' id='theme' options={options} value={theme.value} onChange={(value) => setTheme(value.toString() as Theme)} />
            </div>
            <nav class="footer__navigation">
                <AppLink variant='panel' href="/about">О проекте</AppLink>
                <AppLink variant='panel' href="/">Все посты</AppLink>
            </nav>
            <Text variant='panel' className="footer__author">icy0o, 2026</Text>
        </footer>
    </>
}