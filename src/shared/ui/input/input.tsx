interface InputProps {
    type?: 'text' | 'email' | 'password';
    name?: string;
    id?: string;
    placeholder?: string;
    value?: string;
    error?: string | null;
    label?: string;
    disabled?: boolean;
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
    className,
    onInput
}: InputProps) {
    const fieldId = id || name;

    return (
        <div className={`input_wrapper ${error && 'error'}`}>
            {label && <label for={fieldId}>{label}</label>}
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onInput={(e) => onInput?.(e.currentTarget.value)}
                className={className}
            />

        </div>
    )
}