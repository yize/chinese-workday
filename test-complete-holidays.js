// Test complete holidays data including 2011-2017
const fs = require('fs');

// Read the original index.js
const indexContent = fs.readFileSync('./index.js', 'utf8');

// Extract HOLIDAYS object using regex
const holidaysMatch = indexContent.match(/var HOLIDAYS = \{([\s\S]*?)\};/);
if (!holidaysMatch) {
    console.log('Could not find HOLIDAYS object');
    process.exit(1);
}

const holidaysStr = 'var HOLIDAYS = {' + holidaysMatch[1] + '};';
console.log('Found HOLIDAYS object with', holidaysStr.split('\n').length - 2, 'entries');

// Evaluate to get the object
const holidaysObj = eval(holidaysStr).HOLIDAYS;

// Test specific dates
const testDates = [
    '2017-01-28', // 春节
    '2017-04-04', // 清明节  
    '2017-05-01', // 劳动节
    '2017-10-01', // 国庆节
    '2016-02-08', // 春节
    '2016-04-04', // 清明节
    '2016-06-09', // 端午节
    '2016-09-15', // 中秋节
    '2015-01-01', // 元旦 (should be in extended data)
];

console.log('=== Testing Existing Data ===');
testDates.forEach(date => {
    const festival = holidaysObj[date];
    if (festival) {
        console.log(`${date}: ${festival} ✓`);
    } else {
        console.log(`${date}: Not found ✗`);
    }
});

// Count total entries
console.log(`\nTotal holiday entries: ${Object.keys(holidaysObj).length}`);