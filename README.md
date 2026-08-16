

# 🇨🇳 Chinese Workday

> 高性能中国工作日判断库 · 今天要上班吗？

[![npm version](https://img.shields.io/npm/v/chinese-workday.svg)](https://www.npmjs.com/package/chinese-workday)
[![npm downloads](https://img.shields.io/npm/dm/chinese-workday.svg)](https://www.npmjs.com/package/chinese-workday)
![Performance](https://img.shields.io/badge/performance-60%25%20faster-green)

**解决开发者痛点**：准确判断中国工作日、节假日、调休日，支持 **2011-2026年** 完整数据。

## 🚀 快速开始

### Node.js / npm

```bash
npm install chinese-workday
```

```js
// CommonJS
const { isWorkday, isHoliday, getFestival } = require('chinese-workday')

// ES Module
import { isWorkday, isHoliday, getFestival } from 'chinese-workday'

console.log(isWorkday('2024-10-01')) // false (国庆节)
console.log(isHoliday('2024-10-01')) // true
console.log(getFestival('2024-10-01')) // "国庆节"
```

### 浏览器 / CDN

```html
<script src="https://cdn.jsdelivr.net/npm/chinese-workday@2.0.0/dist/chinese-workday.min.js"></script>
<script>
  const { isWorkday } = window.chineseWorkday
  console.log(isWorkday('2024-10-01')) // false
</script>
```

## 📁 项目结构

```
chinese-workday/
├── src/              # 源码
├── dist/             # 构建产物
│   ├── .cjs.js       # CommonJS
│   ├── .esm.js       # ES Module
│   └── .min.js       # 浏览器/CDN
├── __tests__/        # 测试
└── bench/            # 性能测试
```

## ⚡ 性能优势

| 特性           | chinese-workday | 竞品平均 |
| -------------- | --------------- | -------- |
| **缓存命中率** | 98.40%          | ~70%     |
| **单次查询**   | ~40% 更快       | 基准     |
| **批量查询**   | ~60% 更快       | 基准     |
| **内存占用**   | ~30% 更少       | 基准     |

### 批量查询（推荐多日期场景）

```js
import { isWorkdayBatch, getFestivalBatch } from 'chinese-workday'

const dates = ['2024-10-01', '2024-10-02', '2024-10-03']
const workdayResults = isWorkdayBatch(dates) // [false, false, false]
const festivalResults = getFestivalBatch(dates) // ["国庆节", "国庆节", "国庆节"]
```

## 📊 API

### 基础查询

| 方法                       | 说明                       |
| -------------------------- | -------------------------- |
| `isWorkday(date)`          | 判断是否为工作日（含调休） |
| `isHoliday(date)`          | 判断是否为节假日           |
| `getFestival(date)`        | 获取节日名称               |
| `isAddtionalWorkday(date)` | 判断是否为调休工作日       |
| `isWeekend(date)`          | 判断是否为周末             |

### 批量查询

| 方法                      | 说明             |
| ------------------------- | ---------------- |
| `isWorkdayBatch(dates)`   | 批量判断工作日   |
| `isHolidayBatch(dates)`   | 批量判断节假日   |
| `getFestivalBatch(dates)` | 批量获取节日名称 |

### 高级功能

| 方法                                       | 说明                 |
| ------------------------------------------ | -------------------- |
| `countWorkdays(start, end)`                | 计算工作日数量       |
| `getWorkdaysInRange(start, end)`           | 获取所有工作日       |
| `getHolidaysInRange(start, end)`           | 获取所有节假日       |
| `nextWorkday(date)`                        | 获取下一个工作日     |
| `previousWorkday(date)`                    | 获取上一个工作日     |
| `getWorkdaysInterval(start, end)`          | 计算两日期间工作日数 |
| `addWorkdays(date, n)`                     | 增减工作日           |
| `getWorkdaySequence(start, end, interval)` | 获取工作日序列       |
| `getAnnualStats(year)`                     | 年度统计             |

### 节假日提醒功能

| 方法                                     | 说明               |
| ---------------------------------------- | ------------------ |
| `getNextHoliday(date)`                   | 获取下一个节假日   |
| `daysUntilHoliday(date)`                 | 距下个节假日天数   |
| `isHolidayApproaching(date, daysBefore)` | 节假日是否临近     |
| `getConsecutiveHolidays(date)`           | 获取连续节假日天数 |

### 自定义工作日安排

| 方法                            | 说明                   |
| ------------------------------- | ---------------------- |
| `setWorkSchedule(id, schedule)` | 设置自定义安排         |
| `getWorkSchedule(id)`           | 获取自定义安排         |
| `isWorkdayCustom(date, id)`     | 按自定义安排判断工作日 |
| `isHolidayCustom(date, id)`     | 按自定义安排判断节假日 |
| `clearWorkSchedule(id)`         | 清除自定义安排         |
| `getAvailableSchedules()`       | 获取可用安排列表       |

### 高级统计功能

| 方法                                | 说明             |
| ----------------------------------- | ---------------- |
| `getMonthlyStats(year, month)`      | 月度统计         |
| `getWorkdayRatio(start, end)`       | 工作日比例       |
| `getMostCommonHoliday(year)`        | 最常见节假日     |
| `getHolidaysByFestival(start, end)` | 按节日分组节假日 |

### 工作时间相关功能

| 方法                                          | 说明             |
| --------------------------------------------- | ---------------- |
| `getTotalDays(start, end)`                    | 获取总天数       |
| `calculateWorkHours(start, end, hoursPerDay)` | 计算工作小时     |
| `getWeekRange(date, startDay)`                | 获取周范围       |
| `getMonthRange(date)`                         | 获取月范围       |
| `isWithinOfficeHours(date, options)`          | 是否在办公时间内 |

### 其他

| 方法              | 说明         |
| ----------------- | ------------ |
| `getCacheStats()` | 获取缓存统计 |
| `clearCache()`    | 清除缓存     |

### 新功能使用示例

```js
import {
  getNextHoliday,
  getWorkdayRatio,
  setWorkSchedule,
  isWithinOfficeHours,
  setLeaveBalance,
  applyLeave,
  generateCalendar,
  isWorkdayInTimezone,
  scheduleEventNextWorkday
} from 'chinese-workday'

// 节假日临近提醒
const nextHoliday = getNextHoliday('2024-09-25')
console.log(nextHoliday) // { date: '2024-10-01', festival: '国庆节', daysUntil: 6 }

// 工作日比例统计
const ratio = getWorkdayRatio('2024-01-01', '2024-12-31')
console.log(ratio.workdayPercentage) // 全年工作日占比

// 自定义工作安排
setWorkSchedule('my_company', {
  workdays: [1, 2, 3, 4, 5], // 周一到周五
  holidays: ['2024-01-01', '2024-12-25'], // 特殊假期
  workdaysOnWeekends: ['2024-02-04', '2024-02-11'] // 调休工作日
})

// 办公时间判断
const now = new Date()
const inOffice = isWithinOfficeHours(now, {
  startHour: 9,
  endHour: 18,
  startDay: 1,
  endDay: 6 // 周一到周六
})

// 假期余额管理
setLeaveBalance('employee_001', {
  annual: 15, // 年假15天
  sick: 10, // 病假10天
  personal: 3 // 事假3天
})

const leaveResult = applyLeave('employee_001', 'annual', '2024-06-03', '2024-06-07') // 申请5天年假
console.log(leaveResult) // { success: true, message: "5 days of annual leave applied...", remainingBalance: {...} }

// 工作日历生成
const january2024 = generateCalendar(2024, 1, { includeFestival: true, includeLunar: true })
console.log('January 2024 calendar:', january2024[0]) // First week of January

// 跨时区工作日判断
const isWorkdayInNY = isWorkdayInTimezone('2024-05-06 10:00:00', 'America/New_York') // 中国标准时间下的工作日，在纽约时区是否为工作日
const isWorkdayInUTC = isWorkdayInTimezone(Date.now(), 'UTC') // 当前时间在UTC时区是否为工作日

// 工作日事件调度
const eventId = scheduleEventNextWorkday(
  'monthly_report',
  (date) => {
    console.log(`Run monthly report on next workday: ${date}`)
  },
  '2024-05-01'
) // Schedule from May 1st

// 或者安排在特定工作日执行
scheduleEventOnWorkday(
  'quarterly_meeting',
  (date) => {
    console.log(`Quarterly meeting scheduled for: ${date}`)
  },
  '2024-06-15'
) // Assuming June 15th is a workday
```

### 支持的输入格式

```js
isWorkday('2024-10-01') // 字符串（YYYY-MM-DD 或 YYYY/MM/DD）
isWorkday(new Date()) // Date 对象
isWorkday(1727712000000) // 时间戳
```

## 🎯 使用场景

- 考勤系统 · 工资计算 · 项目排期
- API 服务 · 数据分析 · 前端应用

## 📅 数据覆盖

- ✅ 完整支持 **2011-2026 年** 法定节假日和调休
- ✅ 数据来源：国务院官方公告
- ✅ 每年及时更新

## 🏆 特点

1. 高性能 · 内置 LRU 缓存
2. 零依赖
3. ESM + CJS 双支持
4. 浏览器 CDN 直通
5. TypeScript 类型支持
6. 简单易用

## 📄 许可证

MIT License

---

数据覆盖 2011-2026 年 · 定期更新国务院最新节假日安排
