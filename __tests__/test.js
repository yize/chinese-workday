var ww = require('./index')
// const { isWorkday, isHoliday, getFestival, isAddtionalWorkday } = require('./index');
var isWorkday = ww.isWorkday
var isHoliday = ww.isHoliday
var getFestival = ww.getFestival
var isAddtionalWorkday = ww.isAddtionalWorkday
var isWorkdayBatch = ww.isWorkdayBatch
var isHolidayBatch = ww.isHolidayBatch
var getFestivalBatch = ww.getFestivalBatch
var getCacheStats = ww.getCacheStats

test('isWorkday', function () {
  expect(isWorkday('2018-10-07')).toBe(false)
  expect(isWorkday('2018-10-08')).toBe(true)
  expect(isWorkday('2018-10-21')).toBe(false)
})

test('isHoliday', function () {
  expect(isHoliday('2018-10-07')).toBe(true)
  expect(isHoliday('2018-10-08')).toBe(false)
  expect(isHoliday('2018-10-21')).toBe(true)
})

test('isAddtionalWorkday', function () {
  expect(isAddtionalWorkday('2019-02-02')).toBe(true)
  expect(isAddtionalWorkday('2019-02-01')).toBe(false)
})

test('getFestival', function () {
  expect(getFestival('2018-02-11')).toBe('补春节')
  expect(getFestival('2018-10-07')).toBe('国庆节')
  expect(getFestival('2018-10-08')).toBe('工作日')
  expect(getFestival('2018-10-21')).toBe('周末')
})

test('dateformat', function () {
  expect(isWorkday('2018/10/08')).toBe(true)
  expect(isWorkday(1538981142948)).toBe(true)
  expect(isWorkday('2018-10-07')).toBe(false)
  expect(isWorkday()).toBe(true)
})

// New batch query tests
test('isWorkdayBatch', function () {
  var dates = ['2018-10-07', '2018-10-08', '2018-10-21']
  var results = isWorkdayBatch(dates)
  expect(results).toEqual([false, true, false])
})

test('isHolidayBatch', function () {
  var dates = ['2018-10-07', '2018-10-08', '2018-10-21']
  var results = isHolidayBatch(dates)
  expect(results).toEqual([true, false, true])
})

test('getFestivalBatch', function () {
  var dates = ['2018-02-11', '2018-10-07', '2018-10-08', '2018-10-21']
  var results = getFestivalBatch(dates)
  expect(results).toEqual(['补春节', '国庆节', '工作日', '周末'])
})

test('getCacheStats', function () {
  var stats = getCacheStats()
  expect(stats).toHaveProperty('size')
  expect(stats).toHaveProperty('maxSize')
  expect(stats).toHaveProperty('hits')
  expect(stats).toHaveProperty('misses')
  expect(stats).toHaveProperty('hitRate')
  expect(typeof stats.size).toBe('number')
  expect(typeof stats.hitRate).toBe('number')
})
