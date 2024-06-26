import {Portal} from 'components/Portal';
import {FC, ReactNode, useRef} from 'react';
import {useClickOutsideOfComponent} from 'hooks';

export interface CustomModalProps {
    children: ReactNode;
    title: string;
    onClose: () => void;
}

export const CustomModal: FC<CustomModalProps> = ({children, title, onClose}) => {
    const ref = useRef(null);
    useClickOutsideOfComponent({ref, onClose});

    return (
        <Portal>
            <div className={'modal__wrap'} ref={ref}>
                <div className={'modal__container'}>
                    <div className={'modal__header'}>
                        <h4>{title}</h4>
                        <button className={'button--outlined'} onClick={onClose} type={'button'}>
                            x
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
