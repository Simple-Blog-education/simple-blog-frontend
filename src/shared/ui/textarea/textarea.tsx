import './textarea.css'

interface TextareaProps {
    name: string;
    id?: string;
    value?: string;
    onInput?: (value: string) => void;
    rows?: number;
    columns?: number;
    required?: boolean;
    label?: string;
}

export function Textarea({
    name,
    id,
    value,
    onInput,
    rows,
    columns,
    required = false,
    label
}: TextareaProps) {

    const handleInput = (e: Event) => {
        const input = e.currentTarget as HTMLInputElement;
        onInput?.(input.value);
    }

    const fieldId = id ? id : name;
    return (
        <div className="textarea-wrapper">
            {label && <label htmlFor={fieldId} className="input-label">
                {label}
                {required && <span className="input-label-required" aria-hidden="true"> *</span>}
            </label>}
            <textarea name={name} id={fieldId} value={value} onInput={handleInput} rows={rows} cols={columns} required={required} />
        </div>
    );
}