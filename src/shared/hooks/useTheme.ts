import { signal } from "@preact/signals";

export type Theme = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'app-theme';

export const currentTheme = signal<Theme>(getInitialTheme())

function getInitialTheme() {
    const theme = localStorage.getItem(STORAGE_KEY);
    if (theme === 'light' || theme === 'dark') return theme;
    return 'system';
}

function applyTheme(theme: Theme) {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme == 'system') {
        return;
    }
    root.classList.add(theme);
}

applyTheme(currentTheme.value)

export function useTheme() {
    const setTheme = (theme: Theme) => {
        localStorage.setItem(STORAGE_KEY, theme);
        currentTheme.value = theme;
        applyTheme(theme);
    };

    return {
        theme: currentTheme,
        setTheme,
        isDark: () => {
            if (currentTheme.value === 'system') {
                return window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
            return currentTheme.value === 'dark';
        }
    }
}