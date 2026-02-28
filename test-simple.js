import { isWorkday, isHoliday, getFestival, countWorkdays, nextWorkday, previousWorkday, getLunarInfo, clearCache, getCacheStats, isWorkdayBatch, isHolidayBatch, getFestivalBatch } from './src/index.js';

console.log('Running all tests...\n');

let passed = 0;
let failed = 0;

function test(name, condition) {
  if (condition) {
    console.log(`✓ ${name}`);
    passed++;
  } else {
    console.error(`✗ ${name}`);
    failed++;
  }
}

console.log('=== Basic Tests ===');
test('isWorkday: 2024-10-01 (National Day) should be false', isWorkday('2024-10-01') === false);
test('isHoliday: 2024-10-01 should be true', isHoliday('2024-10-01') === true);
test('getFestival: 2024-10-01 should be 国庆节', getFestival('2024-10-01') === '国庆节');
test('isWorkday: 2024-10-05 (Saturday during holiday) should be false', isWorkday('2024-10-05') === false);
test('isWorkday: 2024-10-12 (adjusted workday) should be true', isWorkday('2024-10-12') === true);

console.log('\n=== 2011 Data Tests ===');
test('isWorkday: 2011-01-01 should be false', isWorkday('2011-01-01') === false);
test('getFestival: 2011-01-01 should be 元旦', getFestival('2011-01-01') === '元旦');

console.log('\n=== Advanced Functions ===');
test('countWorkdays returns number', typeof countWorkdays('2024-05-01', '2024-05-10') === 'number');
test('nextWorkday after holiday', nextWorkday('2024-10-01') === '2024-10-08');
test('previousWorkday before holiday', previousWorkday('2024-10-08') === '2024-09-30');

console.log('\n=== Batch Query Tests ===');
const dates = ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05', '2024-10-06', '2024-10-07', '2024-10-08', '2024-10-12'];
const workdayResults = isWorkdayBatch(dates);
test('isWorkdayBatch returns array of correct length', workdayResults.length === dates.length);
test('isWorkdayBatch: 2024-10-01 should be false', workdayResults[0] === false);
test('isWorkdayBatch: 2024-10-12 (adjusted) should be true', workdayResults[8] === true);

const holidayResults = isHolidayBatch(dates);
test('isHolidayBatch: 2024-10-01 should be true', holidayResults[0] === true);

const festivalResults = getFestivalBatch(dates);
test('getFestivalBatch: first 7 should be 国庆节', festivalResults.slice(0, 7).every(f => f === '国庆节'));
test('getFestivalBatch: 2024-10-08 should be 工作日', festivalResults[7] === '工作日');
test('getFestivalBatch: 2024-10-12 should be 补国庆节', festivalResults[8] === '补国庆节');

console.log('\n=== Cache Tests ===');
const stats1 = getCacheStats();
test('getCacheStats returns object', typeof stats1 === 'object');
test('Cache has hits', stats1.hits > 0);

clearCache();
const stats2 = getCacheStats();
test('clearCache resets hits and misses', stats2.hits === 0 && stats2.misses === 0);

isWorkday('2024-10-01');
const stats3 = getCacheStats();
test('Cache records misses', stats3.misses > 0);

console.log('\n=== Lunar Calendar Tests ===');

const lunar1 = getLunarInfo('2024-02-10');
test('Lunar: 2024-02-10 is Spring Festival', lunar1.lunarString === '正月初一');
test('Lunar: 2024-02-10 lunarFestival should be 春节', lunar1.lunarFestival === '春节');
test('Lunar: 2024-02-10 lunarYear should be 2024', lunar1.lunarYear === 2024);
test('Lunar: 2024-02-10 lunarMonth should be 1', lunar1.lunarMonth === 1);
test('Lunar: 2024-02-10 lunarDay should be 1', lunar1.lunarDay === 1);

const lunar2 = getLunarInfo('2025-01-29');
test('Lunar: 2025-01-29 is Spring Festival', lunar2.lunarString === '正月初一');

const lunar3 = getLunarInfo('2026-02-17');
test('Lunar: 2026-02-17 is Spring Festival', lunar3.lunarString === '正月初一');

const lunar4 = getLunarInfo('2024-10-01');
test('Lunar: 2024-10-01 dayOfWeek should be 工作日', lunar4.dayOfWeek === '工作日');
test('Lunar: 2024-10-01 lunarFestival should be empty', lunar4.lunarFestival === '');

const lunar5 = getLunarInfo('2024-09-17');
test('Lunar: 2024-09-17 is Mid-Autumn Festival (八月十五)', lunar5.lunarString === '八月十五');
test('Lunar: 2024-09-17 lunarFestival should be 中秋节', lunar5.lunarFestival === '中秋节');

const lunar6 = getLunarInfo('2025-02-12');
test('Lunar: 2025-02-12 is Lantern Festival', lunar6.lunarString === '正月十五');
test('Lunar: 2025-02-12 lunarFestival should be 元宵节', lunar6.lunarFestival === '元宵节');

const lunar7 = getLunarInfo('2025-01-28');
test('Lunar: 2025-01-28 dayOfWeek should be 工作日 (调休)', lunar7.dayOfWeek === '工作日');

console.log('\n=== Date Input Format Tests ===');
test('isWorkday: Date object', isWorkday(new Date('2024-10-01')) === false);
test('isWorkday: timestamp', isWorkday(1727740800000) === false);

console.log('\n=== Test Summary ===');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\nAll tests passed! ✅');
}
