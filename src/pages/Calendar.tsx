import {Day} from 'components/Day';
import React from 'react';
import {DAYS_OF_WEEK} from 'utils/constants';
import {useCalendar} from 'hooks';

export const Calendar = () => {
    const {mode, selectedMonth, calendarDays, onClickArrow, setMode} = useCalendar({date: new Date()});

    return (
        <>
            <div className={'header container'}>
                <button onClick={() => onClickArrow('left')} type={'button'}>
                    Назад
                </button>
                <div className={'header__title'}>
                    <h4 style={{textTransform: 'uppercase'}} className={'header__title--child'}>
                        {selectedMonth.monthName} {selectedMonth.year}
                    </h4>
                    <button
                        onClick={() => setMode('week')}
                        className={'header__title--child ' + (mode === 'week' ? '' : 'button--outlined')}
                        type={'button'}>
                        Неделя
                    </button>
                    <button
                        onClick={() => setMode('month')}
                        className={'header__title--child ' + (mode === 'month' ? '' : 'button--outlined')}
                        type={'button'}>
                        Месяц
                    </button>
                </div>
                <button onClick={() => onClickArrow('right')} type={'button'}>
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
