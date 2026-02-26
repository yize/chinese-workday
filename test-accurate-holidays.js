const fs = require('fs');

// Read the accurate holidays data
const holidayData = fs.readFileSync('./holidays-2011-2017-accurate.js', 'utf8');

// Extract HOLIDAYS object
const holidaysMatch = holidayData.match(/var HOLIDAYS = ({[^}]+})/);
if (holidaysMatch) {
  const holidaysStr = holidaysMatch[1];
  const holidays = eval('(' + holidaysStr + ')');
  
  console.log('=== Testing Accurate Holiday Data ===');
  console.log('Total holidays:', Object.keys(holidays).length);
  
  // Test some known dates
  const testDates = [
    '2017-01-28', // 春节
    '2017-04-04', // 清明节
    '2017-05-01', // 劳动节
    '2017-10-01', // 国庆节
    '2016-02-08', // 春节
    '2016-04-04', // 清明节
    '2016-06-09', // 端午节
    '2016-09-15'  // 中秋节
  ];
  
  testDates.forEach(date => {
    if (holidays[date]) {
      console.log(`${date}: ${holidays[date]} ✓`);
    } else {
      console.log(`${date}: Not found ✗`);
    }
  });
} else {
  console.log('Could not find HOLIDAYS object');
}