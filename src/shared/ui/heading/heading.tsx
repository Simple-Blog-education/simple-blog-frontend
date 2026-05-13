import type { ComponentChildren } from "preact";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingVariant = 'display' | 'text';


interface HeadingProps {
    level: HeadingLevel,
    variant?: HeadingVariant,
    bold?: boolean,
    className?: string,
    children: ComponentChildren
}

const tagMap: Record<HeadingLevel, string> = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6'
}

const sizeMap: Record<HeadingLevel, string> = {
    1: 'var:(--heading-1)',
    2: 'var:(--heading-2)',
    3: 'var:(--heading-3)',
    4: 'var:(--heading-4)',
    5: 'var:(--heading-5)',
    6: 'var:(--heading-6)'
}

export function Heading({
    level,
    variant = 'display',
    bold = false,
    className = '',
    children,
}: HeadingProps) {
    const Tag = tagMap[level] as any; // FIXME: типизация

    const style = {
        fontFamily: variant === 'display' ? 'var(--font-display)' : 'var(--font-text)',
        fontSize: sizeMap[level],
        lineHeight: variant === 'display' ? 'var(--line-height-display)' : 'var(--line-height-text)',
        fontWeight: bold ? 'var(--font-weight-bold)' : 'var(--font-weight-default)',
        color: 'var(--color-text)'
    };

    return (
        <Tag className={className} style={style}>
            {children}
        </Tag>
    )
}
