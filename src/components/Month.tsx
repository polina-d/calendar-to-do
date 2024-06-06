import {Day} from './Day';
import React from 'react';
import {DAYS_OF_WEEK} from 'utils/constants';
import {useCalendar} from 'hooks';

export const Month = () => {
    const {selectedMonth, calendarDays, onClickArrow, setMode} = useCalendar({selectedDate: new Date()});

    return (
        <div className='App'>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}>
                <button onClick={() => setMode('week')}>Week</button>
                <button onClick={() => setMode('month')}>Mont</button>
                <p style={{paddingLeft: '20px'}}>
                    {selectedMonth.monthName} {selectedMonth.year}
                </p>
            </div>
            <div style={{display: 'flex', width: '100%'}}>
                {DAYS_OF_WEEK.map((item) => (
                    <div style={{width: '14%'}} key={item}>
                        <p style={{textTransform: 'uppercase'}}>{item}</p>
                    </div>
                ))}
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    borderLeft: '1px solid',
                    borderTop: '1px solid',
                    marginBottom: '20px'
                }}>
                {calendarDays?.map((day) => (
                    <Day
                        {...{
                            monthIndex: day?.monthIndex,
                            dayNumber: day?.dayNumber,
                            date: day?.date
                        }}
                        key={day?.dayNumber + '-' + day?.month}
                    />
                ))}
            </div>
            <button onClick={() => onClickArrow('left')}>Left</button>
            <button onClick={() => onClickArrow('right')}>Right</button>
        </div>
    );
};
