## work-work
今天要上班吗？


[![Build Status][travis-image]][travis-url]

## Install

```bash
$ npm install work-work
```

## Usage

```js
// const { isWorkday, isHoiday, getFestival } = require('work-work');
const ww = require('work-work');
const isWorkday = ww.isWorkday;
const isHoliday = ww.isHoliday;
const getFestival = ww.getFestival;

isWorkday('2018-10-01')
// => false
isHoliday('2018-10-01')
// => true
getFesival('2018-10-01')
// => 国庆节
```

[travis-image]: https://travis-ci.org/yize/work-work.svg?branch=master
[travis-url]: https://travis-ci.org/yize/work-work