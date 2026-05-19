import './checkbox.css'

interface CheckboxProps {
    name: string;
    id?: string;
    label: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

export function Checkbox({
    name,
    id,
    label,
    checked = false,
    onChange
}: CheckboxProps) {
    let actualId = id ? id : name;

    const handleChange = (e: Event) => {
        const input = e.currentTarget as HTMLInputElement;
        onChange?.(input.checked);
    }
    return (
        <div className="checkbox-wrapper">
            <input type="checkbox" name={name} id={actualId} checked={checked} onChange={handleChange} />
            <label for={actualId}>{label}</label>
        </div>
    )
}