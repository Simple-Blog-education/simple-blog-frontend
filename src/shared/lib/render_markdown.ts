import { Marked } from "marked";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import { markedHighlight } from "marked-highlight";

const marked = new Marked(markedHighlight(
    {
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    }
))

marked.setOptions({
    breaks: true,
    gfm: true
})

export function renderMarkdown(markdown: string) {
    if (!markdown) return '';
    const rawHtml = marked.parse(markdown) as string;
    return DOMPurify.sanitize(rawHtml, {
        ALLOWED_TAGS: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'br', 'strong', 'em', 'del', 'a', 'ul', 'ol', 'li',
            'code', 'pre', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
            'img', 'hr', 'span', 'div', 'input', // input для чекбоксов задач
        ],
        ALLOWED_ATTR: [
            'href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel', 'class',
            'type', 'checked', 'disabled', // для input
        ],
    });
}