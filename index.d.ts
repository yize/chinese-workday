/**
 * Chinese Workday - TypeScript definitions
 */

export interface CacheStats {
  size: number
  maxSize: number
  hits: number
  misses: number
  hitRate: number
}

export interface HolidayInfo {
  date: string
  festival: string
}

export interface LunarInfo {
  date: string
  lunarYear: number | null
  lunarMonth: number | null
  lunarDay: number | null
  lunarString: string
  lunarFestival: string
  dayOfWeek: string
}

/**
 * Check if a date is a workday (including adjusted workdays)
 * @param day Date string (YYYY-MM-DD), Date object, or timestamp
 * @returns boolean
 */
export function isWorkday(day: string | Date | number): boolean

/**
 * Check if a date is a holiday
 * @param day Date string (YYYY-MM-DD), Date object, or timestamp
 * @returns boolean
 */
export function isHoliday(day: string | Date | number): boolean

/**
 * Get the festival name for a date
 * @param day Date string (YYYY-MM-DD), Date object, or timestamp
 * @returns Festival name (e.g., "国庆节", "周末", "工作日")
 */
export function getFestival(day: string | Date | number): string

/**
 * Check if a date is an additional workday (adjusted weekend)
 * @param day Date string (YYYY-MM-DD), Date object, or timestamp
 * @returns boolean
 */
export function isAddtionalWorkday(day: string | Date | number): boolean

/**
 * Check if a date is a weekend
 * @param day Date string (YYYY-MM-DD), Date object, or timestamp
 * @returns boolean
 */
export function isWeekend(day: string | Date | number): boolean

// Batch query functions
export function isWorkdayBatch(days: (string | Date | number)[]): boolean[]
export function isHolidayBatch(days: (string | Date | number)[]): boolean[]
export function getFestivalBatch(days: (string | Date | number)[]): string[]

// Cache statistics
export function getCacheStats(): CacheStats

/**
 * Clear the query cache
 */
export function clearCache(): void

// Advanced functions (v1.3.0+)
/**
 * Count workdays between two dates (inclusive)
 * @param start Start date
 * @param end End date
 * @returns Number of workdays
 */
export function countWorkdays(start: string | Date | number, end: string | Date | number): number

/**
 * Get all workdays in a date range (inclusive)
 * @param start Start date
 * @param end End date
 * @returns Array of workday dates (YYYY-MM-DD format)
 */
export function getWorkdaysInRange(
  start: string | Date | number,
  end: string | Date | number
): string[]

/**
 * Get all holidays in a date range (inclusive)
 * @param start Start date
 * @param end End date
 * @returns Array of holiday objects with date and festival name
 */
export function getHolidaysInRange(
  start: string | Date | number,
  end: string | Date | number
): HolidayInfo[]

/**
 * Get the next workday after a given date
 * @param day Reference date
 * @returns Next workday (YYYY-MM-DD format) or null if not found within 7 days
 */
export function nextWorkday(day: string | Date | number): string | null

/**
 * Get the previous workday before a given date
 * @param day Reference date
 * @returns Previous workday (YYYY-MM-DD format) or null if not found within 7 days
 */
export function previousWorkday(day: string | Date | number): string | null

/**
 * Get lunar calendar information for a date
 * @param day Date string (YYYY-MM-DD), Date object, or timestamp
 * @returns Lunar calendar info including lunar year, month, day, and festival
 */
export function getLunarInfo(day: string | Date | number): LunarInfo

// Additional utility functions (v1.4.0+)
/**
 * Calculate the number of workdays between two dates, excluding the start date
 * @param start Start date
 * @param end End date
 * @returns Number of workdays between the dates (excluding start date)
 */
export function getWorkdaysInterval(
  start: string | Date | number,
  end: string | Date | number
): number

/**
 * Get the date that is n workdays after the given date
 * @param day Reference date
 * @param n Number of workdays to add (can be negative)
 * @returns The resulting workday date or null if not found within reasonable range
 */
export function addWorkdays(day: string | Date | number, n: number): string | null

/**
 * Generate a sequence of workdays within a range
 * @param start Start date
 * @param end End date
 * @param interval Interval in workdays (default: 1)
 * @returns Array of workday dates
 */
export function getWorkdaySequence(
  start: string | Date | number,
  end: string | Date | number,
  interval?: number
): string[]

/**
 * Get annual statistics for workdays and holidays
 * @param year Year to get statistics for
 * @returns Statistics object with workdays, holidays, etc.
 */
export interface AnnualStats {
  year: number
  totalDays: number
  workdays: number
  holidays: number
  weekends: number
  additionalWorkdays: number
  workdayPercentage: number
  holidayDistribution: { [festival: string]: number }
}
export function getAnnualStats(year: number): AnnualStats

// Holiday reminder functions (v1.5.0+)
export interface NextHolidayInfo {
  date: string
  festival: string
  daysUntil: number
}
export function getNextHoliday(day: string | Date | number): NextHolidayInfo | null

export function daysUntilHoliday(day: string | Date | number): number

export function isHolidayApproaching(day: string | Date | number, daysBefore?: number): boolean

export function getConsecutiveHolidays(day: string | Date | number): number

// Custom work schedule functions (v1.6.0+)
export interface WorkSchedule {
  workdays: number[] // 0=Sunday, 1=Monday, ..., 6=Saturday
  holidays: string[] // Array of YYYY-MM-DD strings
  workdaysOnWeekends: string[] // Array of YYYY-MM-DD strings
}
export function setWorkSchedule(scheduleId: string, schedule: Partial<WorkSchedule>): void
export function getWorkSchedule(scheduleId: string): WorkSchedule | null
export function isWorkdayCustom(day: string | Date | number, scheduleId?: string): boolean
export function isHolidayCustom(day: string | Date | number, scheduleId?: string): boolean
export function clearWorkSchedule(scheduleId: string): void
export function getAvailableSchedules(): string[]

// Advanced statistics functions (v1.7.0+)
export interface MonthlyStats {
  year: number
  month: number
  totalDays: number
  workdays: number
  holidays: number
  weekends: number
  additionalWorkdays: number
  workdayPercentage: number
}
export function getMonthlyStats(year: number, month: number): MonthlyStats

export interface WorkdayRatio {
  startDate: string
  endDate: string
  totalDays: number
  workdays: number
  holidays: number
  weekends: number
  additionalWorkdays: number
  workdayCount: number
  workdayPercentage: number
  holidayPercentage: number
  weekendPercentage: number
}
export function getWorkdayRatio(
  start: string | Date | number,
  end: string | Date | number
): WorkdayRatio

export interface CommonHoliday {
  festival: string
  count: number
}
export function getMostCommonHoliday(year: number): CommonHoliday | null

export function getHolidaysByFestival(
  start: string | Date | number,
  end: string | Date | number
): { [festival: string]: string[] }

// Work time related functions (v1.8.0+)
export function getTotalDays(start: string | Date | number, end: string | Date | number): number

export function calculateWorkHours(
  start: string | Date | number,
  end: string | Date | number,
  hoursPerDay?: number
): number

export function getWeekRange(
  day: string | Date | number,
  startDay?: number
): { startDate: string; endDate: string }

export function getMonthRange(day: string | Date | number): { startDate: string; endDate: string }

export interface OfficeHoursOptions {
  startHour?: number
  endHour?: number
  startDay?: number
  endDay?: number
}
export function isWithinOfficeHours(
  date: Date | string | number,
  options?: OfficeHoursOptions
): boolean

// Leave management functions (v1.9.0+)
export interface LeaveBalances {
  annual: number
  sick: number
  personal: number
  marriage: number
  maternity: number
  paternity: number
  custom: { [type: string]: number }
}
export function setLeaveBalance(userId: string, balances: Partial<LeaveBalances>): void
export function getLeaveBalance(userId: string): LeaveBalances | null

export interface LeaveApplicationResult {
  success: boolean
  message: string
  leaveDays?: number
  remainingBalance: LeaveBalances | null
}
export function applyLeave(
  userId: string,
  leaveType: string,
  startDate: string | Date | number,
  endDate: string | Date | number,
  includeWorkdays?: boolean
): LeaveApplicationResult

export function addLeaveDays(
  userId: string,
  leaveType: string,
  days: number | { [type: string]: number }
): LeaveApplicationResult

export interface LeaveRecord {
  startDate: string | Date | number
  endDate: string | Date | number
  type: string
  approved: boolean
}
export function calculateActualWorkdays(
  startDate: string | Date | number,
  endDate: string | Date | number,
  leaveRecords?: LeaveRecord[]
): number
