import type { User } from "@/entities/user";
import { cn } from "@/shared/lib/cn";

import './user_avatar.css';
import { API } from "@/shared/api";

interface UserAvatarProps {
    user: Pick<User, 'username' | 'avatar_url'> | null;
    size?: number;
    className?: string;
}

export function UserAvatar({ user, size = 48, className }: UserAvatarProps) {
    if (!user) {
        return (
            <div className={cn('avatar', 'avatar--placeholder', className)}
                style={{ width: size, height: size }}
                aria-label="Аватар не загружен"
                role="img"
            />
        )
    }

    if (user.avatar_url) {
        return (
            <img
                src={API.getUploadURL() + user.avatar_url}
                alt={`Аватар пользователя ${user.username}`}
                width={size}
                height={size}
                className={cn('avatar', className)}
                loading="lazy"
            />
        )
    }

    const initials = user.username.charAt(0).toUpperCase();
    return (
        <div
            className={cn('avatar', 'avatar--initials', className)}
            style={{ width: size, height: size, fontSize: size * 0.5 }}
            aria-label={`Аватар пользователя ${user.username}`}
            role="img"
        >
            {initials}
        </div>
    )
}