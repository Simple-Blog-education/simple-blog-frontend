import type { ComponentChildren } from "preact";

type TextVariant = 'body' | 'ui' | 'ui-thin' | 'code' | 'panel';
type TextTag = 'p' | 'span' | 'div';


interface TextProps {
    variant?: TextVariant,
    as?: TextTag,
    className?: string,
    children: ComponentChildren
}

const variantStyles: Record<TextVariant, Record<string, string>> = {
    body: {
        fontFamily: 'var(--font-text)',
        fontSize: 'var(--text-base)',
        lineHeight: 'var(--line-height-text)',
        fontWeight: 'var(--font-weight-default)',
        color: 'var(--color-text)',
    },
    ui: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-ui)',
        lineHeight: 'var(--line-height-display)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--color-text)',
    },
    'ui-thin': {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-ui)',
        lineHeight: 'var(--line-height-display)',
        fontWeight: 'var(--font-weight-default)',
        color: 'var(--color-text)',
    },
    code: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-code)',
        lineHeight: 'var(--line-height-display)',
        fontWeight: 'var(--font-weight-default)',
        color: 'var(--color-text)',
    },
    panel: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-ui)',
        lineHeight: 'var(--line-height-display)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--color-text-panel)',
    }
};

export function Text({
    variant = 'body',
    as = 'p',
    className = '',
    children,
}: TextProps) {
    const Tag = as as any;
    const styles = variantStyles[variant];
    return (
        <Tag className={className} style={styles}>
            {children}
        </Tag>
    )
}