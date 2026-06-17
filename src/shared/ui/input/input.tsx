import './input.css'

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
    visible?: boolean;
    noLabel?: boolean;
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
    visible = false,
    noLabel = false,
    className = '',
    onInput
}: InputProps) {
    const fieldId = id || name;

    const hiddenType = type === 'password'
        ? (visible ? 'text' : 'password')
        : type;

    const handleInput = (e: Event) => {
        const input = e.currentTarget as HTMLInputElement;
        onInput?.(input.value);
    }

    return (
        <div className={`input-wrapper ${error && 'error'} ${noLabel ? 'no-label' : ''}`}>
            <label htmlFor={fieldId}>
                {label}
                {required && <span aria-hidden="true"> *</span>}
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
            </div>

        </div>
    )
}