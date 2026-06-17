import { Button } from "../button/button"

interface LikeButtonProps {
    active: boolean,
    count: number,
    onClick: () => void,
    loading?: boolean,
    disabled?: boolean
}

export function LikeButton({
    active,
    count,
    onClick,
    loading,
    disabled
}: LikeButtonProps) {
    return (
        <Button variant="outline" onClick={onClick} disabled={disabled || loading} loading={loading}>{active ? 'O' : 'X'} {count}</Button>
    )
}