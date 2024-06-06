import {LOCALE} from 'utils/constants';

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
        year
    };
};