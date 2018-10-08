// from
// - 2018 http://www.gov.cn/zhengce/content/2017-11/30/content_5243579.htm
"use strict";

module.exports = {
  isWorkday: isWorkday,
  isHoliday: isHoliday,
  getFestival: getFestival
};

var HOLIDAYS = {
  "2018-01-01": "元旦",
  "2018-02-15": "春节",
  "2018-02-16": "春节",
  "2018-02-17": "春节",
  "2018-02-18": "春节",
  "2018-02-19": "春节",
  "2018-02-20": "春节",
  "2018-02-21": "春节",
  "2018-04-05": "清明节",
  "2018-04-06": "清明节",
  "2018-04-07": "清明节",
  "2018-04-29": "劳动节",
  "2018-04-30": "劳动节",
  "2018-05-01": "劳动节",
  "2018-06-18": "端午节",
  "2018-09-24": "中秋节",
  "2018-10-01": "国庆节",
  "2018-10-02": "国庆节",
  "2018-10-03": "国庆节",
  "2018-10-04": "国庆节",
  "2018-10-05": "国庆节",
  "2018-10-06": "国庆节",
  "2018-10-07": "国庆节"
};

var WEEKENDS_WORKDAY = {
  "2018-02-11": "补春节",
  "2018-02-24": "补春节",
  "2018-04-08": "补清明节",
  "2018-04-28": "补劳动节",
  "2018-09-29": "补国庆节",
  "2018-09-30": "补国庆节"
};

function isWorkday(day) {
  var fd = formatDate(day);
  if (WEEKENDS_WORKDAY[fd.date]) {
    return true;
  } else if (HOLIDAYS[fd.date]) {
    return false;
  }
  return !fd.weekends;
}

function isHoliday(day) {
  return !isWorkday(day);
}

function getFestival(day) {
  var fd = formatDate(day);
  if (WEEKENDS_WORKDAY[fd.date]) {
    return WEEKENDS_WORKDAY[fd.date];
  } else if (HOLIDAYS[fd.date]) {
    return HOLIDAYS[fd.date]
  }
  return fd.weekends ? '周末' : '工作日';
}

function formatDate(day) {
  var d = new Date(day),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) {
    month = "0" + month
  };
  if (day.length < 2) {
    day = "0" + day
  };

  return {
    date: [year, month, day].join("-"),
    weekends: [0, 6].indexOf(d.getDay()) > -1
  };
}