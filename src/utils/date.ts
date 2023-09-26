export const getUnixTimestampFromDateString = (date: string): number => {
  return Math.floor(new Date(date).getTime() / 1000);
};

export const getMysqlDateTimeString = (time: number): string => {
  return new Date(time * 1000).toISOString().slice(0, 19).replace('T', ' ');
};
