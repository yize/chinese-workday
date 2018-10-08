declare function isWorkday(day: string | date): boolean;
declare function isHoliday(day: string | date): boolean;
declare function getFestival(day: string | date): string;

export = {
  isWorkday,
  isHoliday,
  getFestival
};
