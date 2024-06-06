import React, {FC, useState} from 'react';
import {useCalendar} from 'hooks';
import {DayModal} from './DayModal';

interface DayParams {
    date: Date;
    monthIndex: number;
    dayNumber: number;
}

export const Day: FC<DayParams> = (day) => {
    const {selectedMonth} = useCalendar({selectedDate: day?.date});
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <div
                style={{width: '100%', borderRight: '1px solid', borderBottom: '1px solid'}}
                onClick={() => setOpenModal(true)}>
                <p
                    style={{
                        textTransform: 'uppercase',
                        color: day?.monthIndex === selectedMonth.monthIndex ? 'black' : 'grey'
                    }}>
                    {day?.dayNumber}
                </p>
            </div>
            {openModal && <DayModal date={day?.date} onClose={() => setOpenModal(false)} />}
        </>
    );
};
