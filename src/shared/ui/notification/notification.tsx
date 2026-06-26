import { cn } from "@/shared/lib/cn"
import { Text } from "../text/text";

import './notification.css';

interface NotificationProps {
    variant: 'info' | 'warning' | 'error';
    text?: string | undefined | null;
}

export function Notification({ variant, text }: NotificationProps) {
    if (!text || text.trim() === '') return <></>
    return (
        <div className={cn("notification-wrapper", variant)}>
            <Text variant="ui">{text}</Text>
        </div>
    )
}