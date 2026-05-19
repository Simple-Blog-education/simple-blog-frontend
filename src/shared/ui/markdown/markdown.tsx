import { renderMarkdown } from "@/shared/lib/render_markdown"
import '@/shared/styles/markdown.css'
interface MarkdownProps {
    content: string,
    className?: string
}

export function Markdown({ content, className = '' }: MarkdownProps) {
    const html = renderMarkdown(content);
    return (
        <div className={`markdown-body ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
    )
}