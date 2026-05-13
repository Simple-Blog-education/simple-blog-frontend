import { Text } from "../text/text";
import './select.css'
export interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectProps {
    name?: string;
    id?: string;
    options: SelectOption[];
    value?: string | number;
    label?: string;
    placeholder?: string;
    error?: string | null;
    disabled?: boolean;
    className?: string;
    onChange?: (value: string | number) => void;
}

export function Select({
    name,
    id,
    options,
    value,
    label,
    placeholder,
    error,
    disabled = false,
    className = '',
    onChange
}: SelectProps) {
    const fieldId = id || name;

    return (
        <>
            {label && <label for={fieldId}>{label}</label>}
            <select
                id={fieldId}
                name={name}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange?.(e.currentTarget.value)}
                className={className}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {error && <Text>{error}</Text>}
        </>
    );
}