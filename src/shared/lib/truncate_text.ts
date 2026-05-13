// --- Обрезка текста с сохранением целого слова ---
export const truncateText = (text: string, maxLen: number) => {
    if (text.length <= maxLen) return text;
    const trimmed = text.slice(0, maxLen);
    const lastSpace = trimmed.lastIndexOf(' ');
    return (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed) + '…';
};