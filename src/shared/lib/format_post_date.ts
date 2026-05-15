export function formatPostDate(
    createDate: Date,
    editDate?: Date,
    locale: string = 'ru-RU'
): string {
    const base = createDate.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const isEdited = editDate && createDate.getTime() !== editDate.getTime();
    if (!isEdited) return base;

    const edited = editDate.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return `${base} (обновлено: ${edited})`
}