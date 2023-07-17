export const getDateTimestampFromString = (date: string): number => {
    return new Date(date).getTime();
};