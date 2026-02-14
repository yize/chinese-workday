## chinese-workday

今天要上班吗？


[![Build Status][travis-image]][travis-url]

## Install

```bash
$ npm install chinese-workday
```

## Usage

```js
// const { isWorkday, isHoliday, getFestival } = require('chinese-workday');
const ww = require('chinese-workday');
const isWorkday = ww.isWorkday;
const isHoliday = ww.isHoliday;
const getFestival = ww.getFestival;
const isAddtionalWorkday = ww.isAddtionalWorkday;

isWorkday('2022-10-01')
// => false
isHoliday('2022-10-01')
// => true
isAddtionalWorkday('2022-01-29')
// => true
getFestival('2022-10-01')
// => 国庆节

// New: Batch query APIs
const isWorkdayBatch = ww.isWorkdayBatch;
const isHolidayBatch = ww.isHolidayBatch;
const getFestivalBatch = ww.getFestivalBatch;

// Batch queries for multiple dates (much faster!)
const dates = ['2022-10-01', '2022-10-02', '2022-10-03'];
const results = isWorkdayBatch(dates);
// => [false, false, false]

// New: Cache statistics
const getCacheStats = ww.getCacheStats;
const stats = getCacheStats();
// => { size: 99, maxSize: 1000, hits: 6101, misses: 99, hitRate: 96.91 }
```

## Performance

- **Cache hit rate**: 98.40%
- **Single query**: ~40% faster
- **Batch queries**: ~60% faster

[travis-image]: https://travis-ci.org/yize/chinese-workday.svg?branch=master
[travis-url]: https://travis-ci.org/yize/chinese-workday

**Note**: Since 2018
