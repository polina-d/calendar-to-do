import {useMemo, useState} from 'react';
import {createDate, createMonth} from 'utils/helpers';

interface UseCalendarParams {
    selectedDate: Date;
}

export const useCalendar = ({selectedDate: date}: UseCalendarParams) => {
    const [mode, setMode] = useState<'week' | 'month'>('week');
    const [selectedDay, setSelectedDay] = useState(createDate(date));
    const selectedYear = useMemo(() => selectedDay.year, [selectedDay]);

    const [selectedMonth, setSelectedMonth] = useState(createMonth(new Date(selectedYear, selectedDay.monthIndex)));
    const days = useMemo(() => selectedMonth.createMonthDays(), [selectedMonth]);

    const calendarDays = useMemo(() => {
        const isMonth = mode === 'month';
        const firstDay =
            !isMonth && selectedDay.dayNumber - selectedDay.dayNumberInWeek >= 0
                ? days[selectedDay.dayNumber - selectedDay.dayNumberInWeek]
                : days[0];
        const lastDay =
            !isMonth && selectedDay?.dayNumber + 7 - selectedDay?.dayNumberInWeek <= days.length - 1
                ? days[selectedDay?.dayNumber + 7 - selectedDay?.dayNumberInWeek - 1]
                : days[days.length - 1];

        const numberOfPrevDays = firstDay.dayNumberInWeek - 1;
        const numberOfNextDays = 7 - lastDay.dayNumberInWeek;
        const totalCalendarDays = isMonth ? days.length + numberOfPrevDays + numberOfNextDays : 7;

        const result = [];
        if (numberOfPrevDays > 0) {
            const prevMonthDays = createMonth(new Date(selectedYear, selectedMonth.monthIndex - 1)).createMonthDays();
            for (let i = 0; i < numberOfPrevDays; i += 1) {
                const inverted = numberOfPrevDays - i;
                result[i] = prevMonthDays[prevMonthDays.length - inverted];
            }
        }
        const start = isMonth ? numberOfPrevDays : selectedDay.dayNumber - selectedDay.dayNumberInWeek;
        const end = isMonth
            ? totalCalendarDays - numberOfNextDays
            : totalCalendarDays + selectedDay?.dayNumber - selectedDay?.dayNumberInWeek;

        for (let i = start; i < end; i += 1) {
            result.push(days[i - numberOfPrevDays]);
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
            let d = new Date(calendarDays[0]?.date);
            if (direction === 'left') d.setDate(d.getDate() - 7);
            else if (direction === 'right') d.setDate(d.getDate() + 7);
            if (createDate(d)?.monthIndex !== selectedMonth.monthIndex) {
                setSelectedMonth(createMonth(new Date(selectedYear, createDate(d)?.monthIndex)));
            }
            return setSelectedDay(createDate(d));
        }

        if (mode === 'month') {
            const monthIndex = direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;
            if (monthIndex === -1) {
                const d = new Date(selectedYear, 11, selectedDay?.dayNumber);
                setSelectedMonth(createMonth(d));
                setSelectedDay(createDate(d));
                return;
            }

            if (monthIndex === 12) {
                const d = new Date(selectedYear, 0, selectedDay?.dayNumber);
                setSelectedMonth(createMonth(d));
                setSelectedDay(createDate(d));
                return;
            }
            const d = new Date(selectedYear, monthIndex, selectedDay?.dayNumber);
            setSelectedMonth(createMonth(d));
            setSelectedDay(createDate(d));
        }
    };
    return {
        mode,
        selectedDay,
        selectedMonth,
        calendarDays,
        onClickArrow,
        setMode
    };
};
