import type { ComponentChildren } from "preact";
import './app_link.css'
import { cn } from "@/shared/lib/cn";

type LinkStyle = 'default' | 'panel' | 'page' | 'inline';

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
    children,
    className
}: AppLinkProps) {
    const externalLink = external ?? isExternal(href);
    const classes = cn(variant, className);

    if (externalLink) {
        return (
            <a href={href} className={classes} target="_blank" rel="noopener noreferrer">{children}</a>
        )
    }

    return (
        <a href={href} className={classes}>{children}</a>
    )
}