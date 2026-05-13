import type { ComponentChildren } from "preact";
import './button.css'

interface ButtonProps {
    type?: 'submit' | 'button' | 'reset';
    variant?: 'primary' | 'outline';
    // size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    className?: string;
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
    onClick,
    children
}: ButtonProps) {
    return (
        <button
            type={type}
            class={`button ${className} ${variant}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
            {loading ? "..." : null}
        </button>
    )
}