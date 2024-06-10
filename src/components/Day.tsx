import React, {FC, useContext, useState} from 'react';
import {DayModal} from './DayModal';
import {TargetsListContext} from 'context';
import {formatNumber} from 'utils/helpers';

interface DayParams {
    date: Date;
    dayNumber: number;
    dayNumberInWeek: number;
    isActive: boolean;
}

export const Day: FC<DayParams> = (day) => {
    const [openModal, setOpenModal] = useState(false);
    const {getTargetsByDate} = useContext(TargetsListContext);
    const targets = getTargetsByDate(day?.date);
    const isMobile = window.innerWidth < 600;
    const isDayOff = day?.dayNumberInWeek > 5;
    return (
        <>
            <div
                className={
                    'calendar__cell ' +
                    (day?.isActive ? ' ' : 'calendar__cell--inactive ') +
                    (isDayOff ? 'calendar__cell--day-off' : '')
                }
                onClick={() => setOpenModal(true)}>
                <p>{day?.dayNumber}</p>
                {!!targets?.length && (
                    <ul className={'calendar__cell--targets'}>
                        {targets?.map(
                            (target, index) =>
                                index < 2 && (
                                    <li
                                        className={
                                            'calendar__cell--target ' +
                                            (day?.isActive ? '' : 'calendar__cell--inactive')
                                        }
                                        key={target?.id}>
                                        {target?.value}
                                    </li>
                                )
                        )}
                    </ul>
                )}
                {targets?.length - 2 > 0 && (
                    <p style={{fontSize: '14px'}}>
                        +{' '}
                        {isMobile
                            ? targets?.length - 2
                            : formatNumber(targets?.length - 2, ['задача', 'задачи', 'задач'])}
                    </p>
                )}
            </div>
            {openModal && <DayModal date={day?.date} onClose={() => setOpenModal(false)} />}
        </>
    );
};
