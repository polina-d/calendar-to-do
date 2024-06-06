import {MutableRefObject, useEffect} from 'react';

interface UseClickOutsideOfComponentParams {
    ref: MutableRefObject<null>;
    onClose: () => void;
}

export const useClickOutsideOfComponent = ({ref, onClose}: UseClickOutsideOfComponentParams) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const {target} = event;
            if (target instanceof Node && ref.current === target) onClose();
        };
        const handleEscapePress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        window.addEventListener('click', handleClickOutside);
        window.addEventListener('keydown', handleEscapePress);

        return () => {
            window.removeEventListener('click', handleClickOutside);
            window.removeEventListener('keydown', handleEscapePress);
        };
    }, [ref, onClose]);
};
