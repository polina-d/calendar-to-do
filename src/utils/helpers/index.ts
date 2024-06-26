import {LOCALE} from 'utils/constants';

export const createUniqueID = (): string => {
    return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
};
export const formatNumber = (number: number, titles: string[]): string => {
    //titles example ['день', 'дня', 'дней']
    const cases = [2, 0, 1, 1, 1, 2];
    if (!number) number = 0;
    return (
        number +
        ' ' +
        titles[
            Math.abs(number) % 100 > 4 && Math.abs(number) % 100 < 20
                ? 2
                : cases[Math.abs(number) % 10 < 5 ? Math.abs(number) % 10 : 5]
        ]
    );
};

export const createCalendarKeyByDate = (date: Date): string => {
    return date?.toLocaleString(LOCALE, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
};

export * from './createMonth';
export * from './createDate';
