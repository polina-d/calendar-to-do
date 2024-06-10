import {Day} from './Day';
import React from 'react';
import {DAYS_OF_WEEK} from 'utils/constants';
import {useCalendar} from 'hooks';

export const Month = () => {
    const {mode, selectedMonth, calendarDays, onClickArrow, setMode} = useCalendar({selectedDate: new Date()});

    return (
        <>
            <div className={'header container'}>
                <button onClick={() => onClickArrow('left')} className={'button'} type={'button'}>
                    Назад
                </button>
                <div className={'header__title'}>
                    <h4 style={{textTransform: 'uppercase'}} className={'header__title--child'}>
                        {selectedMonth.monthName} {selectedMonth.year}
                    </h4>
                    <button
                        onClick={() => setMode('week')}
                        className={'header__title--child button ' + (mode === 'week' ? '' : 'button--outlined')}
                        type={'button'}>
                        Неделя
                    </button>
                    <button
                        onClick={() => setMode('month')}
                        className={'header__title--child button ' + (mode === 'month' ? '' : 'button--outlined')}
                        type={'button'}>
                        Месяц
                    </button>
                </div>
                <button onClick={() => onClickArrow('right')} className={'button'} type={'button'}>
                    Вперед
                </button>
            </div>
            <div className={'calendar calendar__header'}>
                {DAYS_OF_WEEK.map((item) => (
                    <p key={item}>{item}</p>
                ))}
            </div>
            <div className={'calendar calendar__body'}>
                {calendarDays?.map((day) => (
                    <Day
                        key={day?.dayNumber + '-' + day?.month}
                        {...{
                            dayNumber: day?.dayNumber,
                            dayNumberInWeek: day?.dayNumberInWeek,
                            date: day?.date,
                            isActive: day?.monthIndex === selectedMonth.monthIndex
                        }}
                    />
                ))}
            </div>
        </>
    );
};
