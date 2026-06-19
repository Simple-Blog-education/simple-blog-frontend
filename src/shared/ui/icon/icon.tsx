import type { ComponentChildren } from "preact";
import { Heart } from "./icons/heart";

type IconName = 'heart';

interface IconProps {
    name: IconName;
    size?: number;
    className?: string;
    filled?: boolean;
}

const icons: Record<IconName, (props: any) => ComponentChildren> = {
    heart: Heart
}

export function Icon({ name, size = 16, className, filled }: IconProps) {
    const IconComponent = icons[name];
    return <IconComponent size={size} class={className} filled={filled} />
}