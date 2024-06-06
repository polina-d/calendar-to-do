import {createDate} from './createDate';

export const createMonth = (date: Date = new Date()) => {
    const d = createDate(date);
    const {month: monthName, year, monthIndex} = d;

    const getDay = (dayNumber: number) => createDate(new Date(year, monthIndex, dayNumber));
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
