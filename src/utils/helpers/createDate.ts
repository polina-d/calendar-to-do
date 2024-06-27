import {LOCALE} from 'utils/constants';

export interface DateParams {
    date: Date;
    dayNumber: number;
    day: string;
    dayNumberInWeek: number;
    month: string;
    monthIndex: number;
    year: number;
    fullDate: string;
}
export const createDate = (date?: Date): DateParams => {
    const d = date ?? new Date();
    const dayNumber = d.getDate();
    const day = d.toLocaleDateString(LOCALE, {weekday: 'long'});
    const dayNumberInWeek = d.getDay() > 0 ? d.getDay() : 7;
    const year = d.getFullYear();
    const month = d.toLocaleDateString(LOCALE, {month: 'long'});
    const monthIndex = d.getMonth();
    const fullDate = d.toLocaleString(LOCALE, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return {
        date: d,
        dayNumber,
        day,
        dayNumberInWeek,
        month,
        monthIndex,
        year,
        fullDate
    };
};
