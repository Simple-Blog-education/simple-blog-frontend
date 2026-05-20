import { renderMarkdown } from "@/shared/lib/render_markdown"
import './markdown.css'
import { useEffect, useRef } from "preact/hooks";
interface MarkdownProps {
    content: string,
    previewMode?: boolean,
    className?: string
}

export function Markdown({ content, previewMode = false, className = '' }: MarkdownProps) {
    const html = renderMarkdown(content);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current || previewMode) return;

        const blocks = ref.current.querySelectorAll('pre');
        blocks.forEach(pre => {
            if (pre.querySelector('.copy-btn')) return;
            const btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.textContent = 'Копировать';
            btn.addEventListener('click', () => {
                const code = pre.querySelector('code')?.textContent || '';
                navigator.clipboard.writeText(code).then(() => {
                    btn.textContent = 'Скопировано!';
                    setTimeout(() => btn.textContent = 'Копировать', 2000);
                });
            });
            pre.appendChild(btn);
        }, [content]);
    })
    return (
        <div ref={ref} className={`markdown-body ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
    )
}