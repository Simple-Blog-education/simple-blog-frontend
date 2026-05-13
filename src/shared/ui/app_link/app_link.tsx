import type { ComponentChildren } from "preact";
import './app_link.css'

type LinkStyle = 'default' | 'header' | 'page' | 'inline';

interface AppLinkProps {
    href: string;
    variant?: LinkStyle;
    className?: string;
    external?: boolean;
    children: ComponentChildren;
}

function isExternal(href: string): boolean {
    return /^https?:\/\//.test(href) || /^\//.test(href) === false;
}

export function AppLink({
    href,
    variant = 'default',
    external,
    children
}: AppLinkProps) {
    const externalLink = external ?? isExternal(href);
    const classes = `${variant}`

    if (externalLink) {
        return (
            <a href={href} className={classes} target="_blank" rel="noopener noreferrer">{children}</a>
        )
    }

    return (
        <a href={href} className={classes}>{children}</a>
    )
}