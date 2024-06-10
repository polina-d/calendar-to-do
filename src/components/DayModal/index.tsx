import React, {FC, useRef} from 'react';
import {Portal} from '../Portal';
import {ModalContent} from './ModalContent';
import {useClickOutsideOfComponent} from 'hooks';
import {createDate} from 'utils/helpers';

export interface DayModalProps {
    onClose: () => void;
    date: Date;
}

export const DayModal: FC<DayModalProps> = ({date, onClose}) => {
    const ref = useRef(null);
    const selectedDate = createDate(date);
    useClickOutsideOfComponent({ref, onClose});

    return (
        <Portal>
            <div className={'modal__wrap'} ref={ref}>
                <div className={'modal__container'}>
                    <div className={'modal__header'}>
                        <h4>{selectedDate?.fullDate}</h4>
                        <button className={'button button--outlined'} onClick={onClose} type={'button'}>
                            x
                        </button>
                    </div>
                    <ModalContent date={date} />
                </div>
            </div>
        </Portal>
    );
};
