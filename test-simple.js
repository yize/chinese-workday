#!/usr/bin/env node

const ww = require('./index.js');

console.log('Running simple tests...');

// Basic functionality
console.assert(ww.isWorkday('2024-10-01') === false, 'isWorkday failed');
console.assert(ww.isHoliday('2024-10-01') === true, 'isHoliday failed');
console.assert(ww.getFestival('2024-10-01') === '国庆节', 'getFestival failed');
console.assert(ww.isAddtionalWorkday('2024-02-04') === true, 'isAddtionalWorkday failed');
console.assert(ww.isWeekend('2024-10-05') === true, 'isWeekend failed');

// Batch functionality
const dates = ['2024-10-01', '2024-10-02'];
console.assert(JSON.stringify(ww.isWorkdayBatch(dates)) === JSON.stringify([false, false]), 'isWorkdayBatch failed');
console.assert(JSON.stringify(ww.getFestivalBatch(dates)) === JSON.stringify(['国庆节', '国庆节']), 'getFestivalBatch failed');

// Advanced functionality
console.assert(ww.countWorkdays('2024-05-01', '2024-05-10') === 5, 'countWorkdays failed');
console.assert(ww.nextWorkday('2024-10-01') === '2024-10-08', 'nextWorkday failed');
console.assert(ww.previousWorkday('2024-10-08') === '2024-09-30', 'previousWorkday failed');

// Cache stats
const stats = ww.getCacheStats();
console.assert(typeof stats.size === 'number', 'getCacheStats failed');

// Test 2011-2017 data
console.assert(ww.isWorkday('2017-01-28') === false, '2017 Spring Festival failed');
console.assert(ww.isWorkday('2016-02-08') === false, '2016 Spring Festival failed');
console.assert(ww.isWorkday('2015-02-19') === false, '2015 Spring Festival failed');
console.assert(ww.isWorkday('2014-01-31') === false, '2014 Spring Festival failed');
console.assert(ww.isWorkday('2013-02-10') === false, '2013 Spring Festival failed');
console.assert(ww.isWorkday('2012-01-23') === false, '2012 Spring Festival failed');
console.assert(ww.isWorkday('2011-02-03') === false, '2011 Spring Festival failed');

console.log('All tests passed! ✅');