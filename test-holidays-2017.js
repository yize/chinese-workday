const fs = require('fs');

// Load the new holiday data
const newHolidays = require('./holidays-2011-2017.js');

// Test some known dates
console.log('=== Testing 2017 Holidays ===');
console.log('2017-01-28 (春节):', newHolidays['2017-01-28'] || 'Not found');
console.log('2017-04-04 (清明节):', newHolidays['2017-04-04'] || 'Not found');
console.log('2017-05-01 (劳动节):', newHolidays['2017-05-01'] || 'Not found');
console.log('2017-10-01 (国庆节):', newHolidays['2017-10-01'] || 'Not found');

console.log('\n=== Testing 2016 Holidays ===');
console.log('2016-02-08 (春节):', newHolidays['2016-02-08'] || 'Not found');
console.log('2016-04-04 (清明节):', newHolidays['2016-04-04'] || 'Not found');
console.log('2016-06-09 (端午节):', newHolidays['2016-06-09'] || 'Not found');
console.log('2016-09-15 (中秋节):', newHolidays['2016-09-15'] || 'Not found');

console.log('\n=== Testing Additional Workdays ===');
// These are harder to verify without official sources
// But I'll include some known ones based on typical patterns
console.log('Total holidays:', Object.keys(newHolidays).length);