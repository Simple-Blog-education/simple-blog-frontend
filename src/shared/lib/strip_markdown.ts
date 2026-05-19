export function stripMarkdown(md: string, maxLength = 150): string {
    // Удаляем заголовки, жирность, ссылки и т.п., оставляя текст
    let plain = md
        .replace(/#{1,6}\s/g, '')
        .replace(/\*{1,2}(.+?)\*{1,2}/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/`{1,3}[^`]+`{1,3}/g, '')
        .replace(/\n/g, ' ');
    return plain.length > maxLength ? plain.slice(0, maxLength).trimEnd() + '…' : plain;
}