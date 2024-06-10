export const formattedNumber = (number: number) => {
    return number < 10 ? '0' + number.toString() : number.toString();
};

export const createUniqueID = () => {
    return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
};

export const formatNumber = (number: number, titles: string[]) => {
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

export * from './createMonth';
export * from './createDate';
