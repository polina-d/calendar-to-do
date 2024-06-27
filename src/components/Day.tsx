import React, {FC, useState} from 'react';
import {DayModal} from './DayModal';
import {formatNumber} from 'utils/helpers';
import {useTargetsByDate} from 'hooks';

interface DayParams {
    date: Date;
    dayNumber: number;
    dayNumberInWeek: number;
    isActive: boolean;
    mode: string;
}

export const Day: FC<DayParams> = ({mode, ...day}) => {
    const {targets} = useTargetsByDate({date: day?.date});
    const [openModal, setOpenModal] = useState(false);
    const isMobile = window.innerWidth < 600;
    const isDayOff = day?.dayNumberInWeek > 5;
    const isWeek = mode === 'week';
    const maxTargets = isWeek ? 6 : 2;

    return (
        <>
            <div
                className={'calendar__cell-wrap '}
                style={{cursor: day?.isActive ? 'pointer' : 'default'}}
                onClick={() => (day?.isActive ? setOpenModal(true) : undefined)}>
                <div
                    className={
                        (day?.isActive ? ' ' : 'calendar__cell--inactive ') +
                        (isDayOff ? 'calendar__cell--day-off' : '')
                    }>
                    <p>{day?.dayNumber}</p>
                    {!!targets?.length && (
                        <ul className={'calendar__cell--targets'}>
                            {targets?.map(
                                (target, index) =>
                                    index < maxTargets && (
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
                    {targets?.length - maxTargets > 0 && (
                        <p style={{fontSize: '14px'}}>
                            +{' '}
                            {isMobile
                                ? targets?.length - maxTargets
                                : formatNumber(targets?.length - maxTargets, ['задача', 'задачи', 'задач'])}
                        </p>
                    )}
                </div>
            </div>
            {openModal && <DayModal date={day?.date} onClose={() => setOpenModal(false)} />}
        </>
    );
};
