import { Button } from "../button/button"
import { Icon } from "../icon/icon"

import './like_button.css';

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
        <Button
            className="like-button"
            variant="outline"
            onClick={onClick}
            disabled={disabled || loading}
            loading={loading}><Icon name="heart" size={16} filled={active} /> {' '} {count}</Button>
    )
}