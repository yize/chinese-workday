const ww = require('./index');

// Test basic functionality
console.log('Running simple tests...');

// Basic tests
if (ww.isWorkday('2024-10-01') !== false) {
  console.error('Assertion failed: isWorkday failed');
  process.exit(1);
}

if (ww.isHoliday('2024-10-01') !== true) {
  console.error('Assertion failed: isHoliday failed');
  process.exit(1);
}

if (ww.getFestival('2024-10-01') !== '国庆节') {
  console.error('Assertion failed: getFestival failed');
  process.exit(1);
}

// Test 2011 data
if (ww.isWorkday('2011-01-01') !== false) {
  console.error('Assertion failed: 2011 data failed');
  process.exit(1);
}

if (ww.getFestival('2011-01-01') !== '元旦') {
  console.error('Assertion failed: 2011 festival failed');
  process.exit(1);
}

// Test advanced functions
if (typeof ww.countWorkdays('2024-05-01', '2024-05-10') !== 'number') {
  console.error('Assertion failed: countWorkdays failed');
  process.exit(1);
}

if (ww.nextWorkday('2024-10-01') !== '2024-10-08') {
  console.error('Assertion failed: nextWorkday failed');
  process.exit(1);
}

if (ww.previousWorkday('2024-10-08') !== '2024-09-30') {
  console.error('Assertion failed: previousWorkday failed');
  process.exit(1);
}

console.log('All tests passed! ✅');