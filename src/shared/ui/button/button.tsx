import type { ComponentChildren } from "preact";
import './button.css'

interface ButtonProps {
    type?: 'submit' | 'button' | 'reset';
    variant?: 'primary' | 'outline' | 'danger';
    // size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    tabIndex?: number;
    onClick?: () => void;
    children: ComponentChildren
}

export function Button({
    type = 'button',
    variant = 'primary',
    // size = 'medium',
    disabled = false,
    loading = false,
    className = '',
    tabIndex = 0,
    onClick,
    children
}: ButtonProps) {
    return (
        <button
            type={type}
            class={`button ${className} ${variant}`}
            disabled={disabled}
            tabIndex={tabIndex}
            onClick={onClick}
        >
            {children}
            {loading ? "..." : null}
        </button>
    )
}