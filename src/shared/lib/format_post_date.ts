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

export function formatCommentDate(createDate: Date, locale: string = 'ru-RU') {
    return createDate.toLocaleString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
}