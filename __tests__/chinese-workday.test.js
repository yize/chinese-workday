const ww = require('../index')
const {
  isWorkday,
  isHoliday,
  getFestival,
  isAddtionalWorkday,
  isWeekend,
  isWorkdayBatch,
  isHolidayBatch,
  getFestivalBatch,
  getCacheStats,
  countWorkdays,
  getWorkdaysInRange,
  getHolidaysInRange,
  nextWorkday,
  previousWorkday
} = ww

describe('Chinese Workday', () => {
  // Basic functionality tests
  describe('Basic Functions', () => {
    test('isWorkday', () => {
      expect(isWorkday('2024-10-01')).toBe(false) // National Day
      expect(isWorkday('2024-10-08')).toBe(true) // Workday after holiday
      expect(isWorkday('2024-10-05')).toBe(false) // Weekend
    })

    test('isHoliday', () => {
      expect(isHoliday('2024-10-01')).toBe(true)
      expect(isHoliday('2024-10-08')).toBe(false)
    })

    test('getFestival', () => {
      expect(getFestival('2024-10-01')).toBe('国庆节')
      expect(getFestival('2024-02-04')).toBe('补春节') // Additional workday
      expect(getFestival('2024-10-05')).toBe('周末')
      expect(getFestival('2024-10-08')).toBe('工作日')
    })

    test('isAddtionalWorkday', () => {
      expect(isAddtionalWorkday('2024-02-04')).toBe(true)
      expect(isAddtionalWorkday('2024-10-01')).toBe(false)
    })

    test('isWeekend', () => {
      expect(isWeekend('2024-10-05')).toBe(true) // Saturday
      expect(isWeekend('2024-10-06')).toBe(true) // Sunday
      expect(isWeekend('2024-10-07')).toBe(false) // Monday
    })
  })

  // Batch functionality tests
  describe('Batch Functions', () => {
    const dates = ['2024-10-01', '2024-10-02', '2024-10-08']

    test('isWorkdayBatch', () => {
      expect(isWorkdayBatch(dates)).toEqual([false, false, true])
    })

    test('isHolidayBatch', () => {
      expect(isHolidayBatch(dates)).toEqual([true, true, false])
    })

    test('getFestivalBatch', () => {
      expect(getFestivalBatch(dates)).toEqual(['国庆节', '国庆节', '工作日'])
    })
  })

  // Advanced functionality tests
  describe('Advanced Functions', () => {
    test('countWorkdays', () => {
      expect(countWorkdays('2024-05-01', '2024-05-10')).toBe(5)
      expect(countWorkdays('2024-10-01', '2024-10-07')).toBe(0) // All holidays/weekend
    })

    test('nextWorkday', () => {
      expect(nextWorkday('2024-10-01')).toBe('2024-10-08')
      expect(nextWorkday('2024-10-05')).toBe('2024-10-07') // Saturday -> Monday
    })

    test('previousWorkday', () => {
      expect(previousWorkday('2024-10-08')).toBe('2024-09-30')
      expect(previousWorkday('2024-10-07')).toBe('2024-09-30') // Monday -> previous Friday
    })

    test('getWorkdaysInRange', () => {
      const workdays = getWorkdaysInRange('2024-05-01', '2024-05-05')
      expect(workdays).toEqual([])

      const workdays2 = getWorkdaysInRange('2024-05-06', '2024-05-10')
      expect(workdays2.length).toBe(5)
    })

    test('getHolidaysInRange', () => {
      const holidays = getHolidaysInRange('2024-05-01', '2024-05-05')
      expect(holidays.length).toBe(5)
      expect(holidays[0]).toEqual({ date: '2024-05-01', festival: '劳动节' })
    })
  })

  // Cache and performance tests
  describe('Cache and Performance', () => {
    test('getCacheStats', () => {
      const stats = getCacheStats()
      expect(stats).toHaveProperty('size')
      expect(stats).toHaveProperty('maxSize')
      expect(stats).toHaveProperty('hits')
      expect(stats).toHaveProperty('misses')
      expect(stats).toHaveProperty('hitRate')
    })

    test('cache hit rate improves with repeated queries', () => {
      const initialHits = getCacheStats().hits
      isWorkday('2024-10-01')
      isWorkday('2024-10-01') // Should be cache hit
      const finalHits = getCacheStats().hits
      expect(finalHits).toBeGreaterThan(initialHits)
    })
  })

  // Date format compatibility tests
  describe('Date Format Compatibility', () => {
    test('supports YYYY-MM-DD string', () => {
      expect(isWorkday('2024-10-01')).toBe(false)
    })

    test('supports YYYY/MM/DD string', () => {
      expect(isWorkday('2024/10/01')).toBe(false)
    })

    test('supports Date object', () => {
      const date = new Date('2024-10-01')
      expect(isWorkday(date)).toBe(false)
    })

    test('supports timestamp', () => {
      const timestamp = new Date('2024-10-01').getTime()
      expect(isWorkday(timestamp)).toBe(false)
    })

    test('supports undefined (today)', () => {
      expect(typeof isWorkday()).toBe('boolean')
    })
  })

  // Error handling tests
  describe('Error Handling', () => {
    test('throws error for invalid date', () => {
      expect(() => isWorkday('invalid-date')).toThrow()
    })
  })
})
