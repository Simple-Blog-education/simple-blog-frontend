import { useState } from 'preact/hooks';
import './input.css'
import { Button } from '../button/button';

interface InputProps {
    type?: 'text' | 'email' | 'password';
    name?: string;
    id?: string;
    placeholder?: string;
    value?: string;
    error?: string | null;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    showToggle?: boolean;
    className?: string;
    onInput?: (value: string) => void;
}

export function Input({
    type = 'text',
    name,
    id,
    placeholder,
    value,
    error,
    label,
    disabled = false,
    required = false,
    showToggle = false,
    className = '',
    onInput
}: InputProps) {
    const fieldId = id || name;
    const [hidden, setHidden] = useState(true);

    const hiddenType = showToggle && type === 'password'
        ? (hidden ? 'password' : 'text')
        : type;

    const handleInput = (e: Event) => {
        const input = e.currentTarget as HTMLInputElement;
        onInput?.(input.value);
    }

    return (
        <div className={`input-wrapper ${error && 'error'}`}>
            <label htmlFor={fieldId} className="input-label">
                {label}
                {required && <span className="input-label__required" aria-hidden="true"> *</span>}
            </label>
            <div className="input-field-wrapper">
                <input
                    id={fieldId}
                    name={name}
                    type={hiddenType}
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    required={required}
                    aria-required={required}
                    onInput={handleInput}
                    className={`input-field ${className}`}
                />
                {showToggle && type === 'password' && (
                    <Button
                        type="button"
                        className="input-toggle"
                        onClick={() => setHidden(!hidden)}
                        variant='outline'
                        tabIndex={-1}
                    >
                        {hidden ? 'Показать' : 'Скрыть'}
                    </Button>
                )}
            </div>

        </div>
    )
}