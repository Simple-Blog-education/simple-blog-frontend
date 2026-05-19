import { useCallback, useState } from "preact/hooks";

export function usePasswordVisibility(initialValue = false) {
    const [visible, setVisible] = useState(initialValue);
    const toggle = useCallback(() => setVisible(v => !v), []);

    return { visible, toggle }
}