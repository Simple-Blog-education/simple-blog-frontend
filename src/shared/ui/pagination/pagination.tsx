import { Button } from "../button/button";

interface PaginationProps {
    currentPage: number,
    total: number,
    perPage: number,
    onPageChange: (page: number) => void;
    className?: string
}

export function Pagination({
    currentPage,
    total,
    perPage,
    onPageChange,
    className = ""
}: PaginationProps) {
    const totalPages = Math.ceil(total / perPage);
    if (totalPages <= 1) return null;

    const pages: (number | '...')[] = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
    }

    if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
    }

    return (
        <nav className={`pagination ${className}`} aria-label={"Пагинация"}>
            <Button variant="outline" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>{"<"}</Button>
            {pages.map((page) => page === '...' ?
                (<span className={"pagination-dots"}>...</span>) :
                (<Button variant={page === currentPage ? 'primary' : 'outline'} onClick={() => onPageChange(page as number)}>{page}</Button>))}
            <Button variant="outline" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>{">"}</Button>
        </nav>
    );
}