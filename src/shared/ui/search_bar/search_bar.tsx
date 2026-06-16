import { useEffect, useState } from "preact/hooks";
import { Button } from "../button/button";
import { Input } from "../input/input";

import './search_bar.css';

interface SearchBarParams {
    initialValue: string;
    onSearch: (value: string) => void
    placeholder?: string;
}

export function SearchBar({
    initialValue,
    placeholder = '',
    onSearch
}: SearchBarParams) {
    const [value, setValue] = useState(initialValue);
    useEffect(() => setValue(initialValue), [initialValue])

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        onSearch(value.trim());
    }

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <Input name="search" type="text" placeholder={placeholder} value={value}
                onInput={setValue} noLabel={true} />
            <Button type="submit" variant="primary">Найти</Button>
        </form>

    )
}