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
