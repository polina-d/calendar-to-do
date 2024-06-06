export const formattedNumber = (number: number) => {
    return number < 10 ? '0' + number.toString() : number.toString();
};

export const createUniqueID = () => {
    return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
};

export * from './createMonth';
export * from './createDate';
