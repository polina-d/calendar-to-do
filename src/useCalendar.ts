import {useMemo, useState} from 'react';

const LOCALE = 'default'

export const createDate = (date?: Date) => {
    const d = date ?? new Date();
    const dayNumber = d.getDate();
    const day = d.toLocaleDateString(LOCALE, {weekday: 'long'});
    const dayNumberInWeek = d.getDay() > 0 ? d.getDay() : 7;
    const year = d.getFullYear();
    const month = d.toLocaleDateString(LOCALE, {month: 'long'});
    const monthIndex = d.getMonth();

    return {
        date: d,
        dayNumber,
        day,
        dayNumberInWeek,
        month,
        monthIndex,
        year,

    };
};

export const createMonth = (date: Date = new Date()) => {
    const d = createDate(date);
    const {month: monthName, year, monthIndex} = d;

    const getDay = (dayNumber: number) =>
        createDate(new Date(year, monthIndex, dayNumber));

    const createMonthDays = () => {
        const days = [];
        for (let i = 0; i <= new Date(year, monthIndex + 1, 0).getDate() - 1; i += 1) {
            days[i] = getDay(i + 1);
        }

        return days;
    };

    return {
        getDay,
        monthName,
        monthIndex,
        year,
        createMonthDays
    };
};

interface UseCalendarParams {
    selectedDate: Date;
}


export const useCalendar = ({selectedDate: date}: UseCalendarParams) => {
    const [mode, setMode] = useState<'week' | 'month'>('month');
    const [selectedDay, setSelectedDay] = useState(createDate(date));
    const selectedYear = useMemo(() => selectedDay.year, [selectedDay]);

    const [selectedMonth, setSelectedMonth] = useState(
        createMonth(new Date(selectedYear, selectedDay.monthIndex))
    );
    const days = useMemo(() => selectedMonth.createMonthDays(), [selectedMonth]);

    const calendarDays = useMemo(() => {
        const isMonth = mode === 'month'
        const firstDay = !isMonth && selectedDay.dayNumber - selectedDay.dayNumberInWeek >= 0 ? days[selectedDay.dayNumber - selectedDay.dayNumberInWeek] : days[0];
        const lastDay = !isMonth && selectedDay?.dayNumber + 7 - selectedDay?.dayNumberInWeek <= days.length - 1 ? days[selectedDay?.dayNumber + 7 - selectedDay?.dayNumberInWeek - 1] : days[days.length - 1]

        const numberOfPrevDays = firstDay.dayNumberInWeek - 1
        const numberOfNextDays = 7 - lastDay.dayNumberInWeek
        const totalCalendarDays = isMonth ? days.length + numberOfPrevDays + numberOfNextDays : 7;

        const result = [];
        if (numberOfPrevDays > 0) {
            const prevMonthDays = createMonth(new Date(selectedYear, selectedMonth.monthIndex - 1)).createMonthDays();
            for (let i = 0; i < numberOfPrevDays; i += 1) {
                const inverted = numberOfPrevDays - i;
                result[i] = prevMonthDays[prevMonthDays.length - inverted];
            }
        }
        const start = isMonth ? numberOfPrevDays : selectedDay.dayNumber - selectedDay.dayNumberInWeek
        const end = isMonth ? totalCalendarDays - numberOfNextDays : totalCalendarDays - selectedDay?.dayNumber - selectedDay?.dayNumberInWeek
        for (let i = start; i < end; i += 1) {
            result.push(days[i - numberOfPrevDays])
        }
        if (numberOfNextDays > 0) {
            const nextMonthDays = createMonth(new Date(selectedYear, selectedMonth.monthIndex + 1)).createMonthDays();
            for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i += 1) {
                result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
            }
        }
        return result;
    }, [mode, selectedMonth.monthIndex, selectedYear, days, selectedDay.dayNumber, selectedDay.dayNumberInWeek]);

    const onClickArrow = (direction: 'right' | 'left') => {
        if (mode === 'week') {
            let d = new Date(calendarDays[0]?.date)
            if (direction === 'left') d.setDate(d.getDate() - 7);
            else if (direction === 'right') d.setDate(d.getDate() + 7)
            if (createDate(d)?.monthIndex !== selectedMonth.monthIndex) {
                console.log('month change')
                setSelectedMonth(createMonth(new Date(selectedYear, createDate(d)?.monthIndex)))
            }
            console.log('onClickArrow', createDate(d))
            return setSelectedDay(createDate(d));
        }

        if (mode === 'month') {
            const monthIndex =
                direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;
            if (monthIndex === -1) {
                return setSelectedMonth(createMonth(new Date(selectedYear - 1, 11)));
            }

            if (monthIndex === 12) {
                return setSelectedMonth(createMonth(new Date(selectedYear + 1, 0)));
            }

            setSelectedMonth(createMonth(new Date(selectedYear, monthIndex)));
        }
    };
    return {
        mode,
        calendarMonthDays: calendarDays,
        selectedDay,
        selectedMonth,
        calendarDays,
        onClickArrow,
        setMode,
    };
};