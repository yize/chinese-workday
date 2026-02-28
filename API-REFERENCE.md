# Chinese Workday API 参考文档

## 目录

- [基础功能](#基础功能)
- [批量查询](#批量查询)
- [高级功能](#高级功能)
- [节假日提醒](#节假日提醒功能)
- [自定义工作安排](#自定义工作安排)
- [高级统计](#高级统计功能)
- [工作时间相关](#工作时间相关功能)
- [假期管理](#假期管理功能)
- [工作日历](#工作日历相关功能)
- [时区支持](#时区支持功能)

---

## 基础功能

### isWorkday(day)

判断指定日期是否为工作日（包括调休工作日）

**参数:**

- `day` (string | Date | number): 日期，支持 'YYYY-MM-DD' 格式、Date 对象或时间戳

**返回:** `boolean` - 是否为工作日

**示例:**

```js
import { isWorkday } from 'chinese-workday'
isWorkday('2024-10-01') // false (国庆节)
isWorkday('2024-10-08') // true (节后首个工作日)
```

### isHoliday(day)

判断指定日期是否为节假日

**参数:**

- `day` (string | Date | number): 日期，支持 'YYYY-MM-DD' 格式、Date 对象或时间戳

**返回:** `boolean` - 是否为节假日

**示例:**

```js
import { isHoliday } from 'chinese-workday'
isHoliday('2024-10-01') // true
isHoliday('2024-10-08') // false
```

### getFestival(day)

获取指定日期的节日名称

**参数:**

- `day` (string | Date | number): 日期

**返回:** `string` - 节日名称（如 "国庆节"、"周末"、"工作日"）

**示例:**

```js
import { getFestival } from 'chinese-workday'
getFestival('2024-10-01') // "国庆节"
getFestival('2024-10-06') // "国庆节"
getFestival('2024-10-12') // "补国庆节" (调休)
```

### isAddtionalWorkday(day)

判断是否为调休工作日（周末调整为工作日）

**参数:**

- `day` (string | Date | number): 日期

**返回:** `boolean` - 是否为调休工作日

**示例:**

```js
import { isAddtionalWorkday } from 'chinese-workday'
isAddtionalWorkday('2024-10-12') // true (国庆调休)
isAddtionalWorkday('2024-01-01') // false
```

### isWeekend(day)

判断是否为周末

**参数:**

- `day` (string | Date | number): 日期

**返回:** `boolean` - 是否为周末

**示例:**

```js
import { isWeekend } from 'chinese-workday'
isWeekend('2024-01-06') // true (周六)
isWeekend('2024-01-01') // false (虽然是节假日，但不是周末)
```

## 批量查询

### isWorkdayBatch(days)

批量判断是否为工作日

**参数:**

- `days` (Array<string | Date | number>): 日期数组

**返回:** `Array<boolean>` - 对应的判断结果

**示例:**

```js
import { isWorkdayBatch } from 'chinese-workday'
const dates = ['2024-10-01', '2024-10-02', '2024-10-03']
const results = isWorkdayBatch(dates) // [false, false, false]
```

### isHolidayBatch(days)

批量判断是否为节假日

**参数:**

- `days` (Array<string | Date | number>): 日期数组

**返回:** `Array<boolean>` - 对应的判断结果

### getFestivalBatch(days)

批量获取节日名称

**参数:**

- `days` (Array<string | Date | number>): 日期数组

**返回:** `Array<string>` - 对应的节日名称

## 高级功能

### countWorkdays(start, end)

计算指定日期范围内的工作日数量（包含起止日期）

**参数:**

- `start` (string | Date | number): 开始日期
- `end` (string | Date | number): 结束日期

**返回:** `number` - 工作日数量

**示例:**

```js
import { countWorkdays } from 'chinese-workday'
countWorkdays('2024-01-01', '2024-01-31') // 计算1月份工作日数
```

### getWorkdaysInRange(start, end)

获取指定日期范围内的所有工作日

**参数:**

- `start` (string | Date | number): 开始日期
- `end` (string | Date | number): 结束日期

**返回:** `Array<string>` - 工作日日期数组（格式 'YYYY-MM-DD'）

**示例:**

```js
import { getWorkdaysInRange } from 'chinese-workday'
const workdays = getWorkdaysInRange('2024-01-01', '2024-01-31')
```

### getHolidaysInRange(start, end)

获取指定日期范围内的所有节假日

**参数:**

- `start` (string | Date | number): 开始日期
- `end` (string | Date | number): 结束日期

**返回:** `Array<{date: string, festival: string}>` - 包含日期和节日名称的对象数组

### nextWorkday(day)

获取指定日期之后的下一个工作日

**参数:**

- `day` (string | Date | number): 参考日期

**返回:** `string | null` - 下一个工作日（'YYYY-MM-DD' 格式）或 null（如果7天内未找到）

**示例:**

```js
import { nextWorkday } from 'chinese-workday'
nextWorkday('2024-10-01') // '2024-10-08' (国庆假期后首个工作日)
```

### previousWorkday(day)

获取指定日期之前的上一个工作日

**参数:**

- `day` (string | Date | number): 参考日期

**返回:** `string | null` - 上一个工作日（'YYYY-MM-DD' 格式）或 null（如果7天内未找到）

### getWorkdaysInterval(start, end)

计算两个日期之间的工作日数量（不包含起始日期）

**参数:**

- `start` (string | Date | number): 开始日期
- `end` (string | Date | number): 结束日期

**返回:** `number` - 工作日间隔数量

### addWorkdays(day, n)

在指定日期上增加或减少工作日

**参数:**

- `day` (string | Date | number): 基准日期
- `n` (number): 要增加的工作日数（负数表示减少）

**返回:** `string | null` - 结果日期或 null（如果在合理范围内未找到）

### getWorkdaySequence(start, end, interval)

生成指定范围内的工作日序列

**参数:**

- `start` (string | Date | number): 开始日期
- `end` (string | Date | number): 结束日期
- `interval` (number): 间隔天数（默认为1）

**返回:** `Array<string>` - 工作日序列

### getAnnualStats(year)

获取指定年份的统计数据

**参数:**

- `year` (number): 年份（2011-2026）

**返回:** `AnnualStats` - 统计数据对象

## 节假日提醒功能

### getNextHoliday(day)

获取指定日期之后的下一个节假日

**参数:**

- `day` (string | Date | number): 参考日期

**返回:** `{date: string, festival: string, daysUntil: number} | null` - 节假日信息或 null

**示例:**

```js
import { getNextHoliday } from 'chinese-workday'
const next = getNextHoliday('2024-09-25')
console.log(next) // { date: '2024-10-01', festival: '国庆节', daysUntil: 6 }
```

### daysUntilHoliday(day)

计算距离下一个节假日的天数

**参数:**

- `day` (string | Date | number): 参考日期

**返回:** `number` - 天数，-1表示一年内未找到

### isHolidayApproaching(day, daysBefore)

判断是否临近节假日

**参数:**

- `day` (string | Date | number): 参考日期
- `daysBefore` (number): 提前几天数（默认1天）

**返回:** `boolean` - 是否临近节假日

**示例:**

```js
import { isHolidayApproaching } from 'chinese-workday'
isHolidayApproaching('2024-09-28', 3) // true (国庆节前3天)
```

### getConsecutiveHolidays(day)

获取从指定日期开始的连续节假日天数

**参数:**

- `day` (string | Date | number): 参考日期

**返回:** `number` - 连续节假日天数，0表示该日期不是节假日

## 自定义工作安排

### setWorkSchedule(scheduleId, schedule)

设置自定义工作安排

**参数:**

- `scheduleId` (string): 安排ID
- `schedule` (Object): 安排配置
  - `workdays` (Array<number>): 工作日数组（0=周日, 1=周一...6=周六）默认 [1,2,3,4,5]
  - `holidays` (Array<string>): 节假日数组（'YYYY-MM-DD'格式）默认 []
  - `workdaysOnWeekends` (Array<string>): 周末工作日数组（'YYYY-MM-DD'格式）默认 []

**示例:**

```js
import { setWorkSchedule } from 'chinese-workday'
setWorkSchedule('my_company', {
  workdays: [1, 2, 3, 4, 5, 6], // 周一到周六工作
  holidays: ['2024-01-01'],
  workdaysOnWeekends: ['2024-02-04'] // 特殊调休
})
```

### getWorkSchedule(scheduleId)

获取自定义工作安排

**参数:**

- `scheduleId` (string): 安排ID

**返回:** `WorkSchedule | null` - 安排配置或 null

### isWorkdayCustom(day, scheduleId)

按自定义安排判断是否为工作日

**参数:**

- `day` (string | Date | number): 日期
- `scheduleId` (string): 安排ID（默认 'default'）

**返回:** `boolean` - 是否为工作日

### isHolidayCustom(day, scheduleId)

按自定义安排判断是否为节假日

**参数:**

- `day` (string | Date | number): 日期
- `scheduleId` (string): 安排ID（默认 'default'）

**返回:** `boolean` - 是否为节假日

### clearWorkSchedule(scheduleId)

清除自定义工作安排

**参数:**

- `scheduleId` (string): 安排ID

### getAvailableSchedules()

获取所有可用的自定义安排ID

**返回:** `Array<string>` - 安排ID数组

## 高级统计功能

### getMonthlyStats(year, month)

获取指定年月的统计数据

**参数:**

- `year` (number): 年份（2011-2026）
- `month` (number): 月份（1-12）

**返回:** `MonthlyStats` - 月度统计数据

### getWorkdayRatio(start, end)

获取指定范围的工作日比例统计

**参数:**

- `start` (string | Date | number): 开始日期
- `end` (string | Date | number): 结束日期

**返回:** `WorkdayRatio` - 工作日比例统计

### getMostCommonHoliday(year)

获取指定年份最常见（天数最多）的节假日

**参数:**

- `year` (number): 年份（2011-2026）

**返回:** `{festival: string, count: number} | null` - 最常见节假日信息

### getHolidaysByFestival(start, end)

按节日分组获取节假日

**参数:**

- `start` (string | Date | number): 开始日期
- `end` (string | Date | number): 结束日期

**返回:** `{[festival: string]: string[]}` - 以节日名称为键、日期数组为值的对象

## 工作时间相关功能

### getTotalDays(start, end)

获取两个日期之间的总天数（包含起止日期）

**参数:**

- `start` (string | Date | number): 开始日期
- `end` (string | Date | number): 结束日期

**返回:** `number` - 总天数

### calculateWorkHours(start, end, hoursPerDay)

计算指定范围内的工作小时数

**参数:**

- `start` (string | Date | number): 开始日期
- `end` (string | Date | number): 结束日期
- `hoursPerDay` (number): 每日工作小时数（默认8小时）

**返回:** `number` - 工作小时数

**示例:**

```js
import { calculateWorkHours } from 'chinese-workday'
calculateWorkHours('2024-01-01', '2024-01-31', 8) // 计算1月的工作小时数
```

### getWeekRange(day, startDay)

获取指定日期所在周的起止日期

**参数:**

- `day` (string | Date | number): 参考日期
- `startDay` (number): 一周开始日（0=周日, 1=周一，默认1）

**返回:** `{startDate: string, endDate: string}` - 周起止日期

### getMonthRange(day)

获取指定日期所在月的起止日期

**参数:**

- `day` (string | Date | number): 参考日期

**返回:** `{startDate: string, endDate: string}` - 月起止日期

### isWithinOfficeHours(date, options)

判断日期时间是否在办公时间内

**参数:**

- `date` (Date | string | number): 包含时间的日期
- `options` (Object): 办公时间选项
  - `startHour` (number): 开始小时（默认9）
  - `endHour` (number): 结束小时（默认18）
  - `startDay` (number): 一周开始日（默认1=周一）
  - `endDay` (number): 一周结束日（默认5=周五）

**返回:** `boolean` - 是否在办公时间内

**示例:**

```js
import { isWithinOfficeHours } from 'chinese-workday'
const now = new Date('2024-01-15 10:30:00') // 周一上午10:30
const inOffice = isWithinOfficeHours(now, {
  startHour: 9,
  endHour: 18,
  startDay: 1,
  endDay: 6 // 周一到周六
})
```

## 假期管理功能

### setLeaveBalance(userId, balances)

设置用户假期余额

**参数:**

- `userId` (string): 用户ID
- `balances` (Object): 假期余额对象
  - `annual` (number): 年假天数
  - `sick` (number): 病假天数
  - `personal` (number): 事假天数
  - `marriage` (number): 婚假天数
  - `maternity` (number): 产假天数
  - `paternity` (number): 陪产假天数
  - `custom` (Object): 自定义假期类型

**示例:**

```js
import { setLeaveBalance } from 'chinese-workday'
setLeaveBalance('emp001', {
  annual: 15,
  sick: 10,
  personal: 3
})
```

### getLeaveBalance(userId)

获取用户假期余额

**参数:**

- `userId` (string): 用户ID

**返回:** `LeaveBalances` - 假期余额对象

### applyLeave(userId, leaveType, startDate, endDate, includeWorkdays)

申请假期并更新余额

**参数:**

- `userId` (string): 用户ID
- `leaveType` (string): 假期类型
- `startDate` (string | Date | number): 开始日期
- `endDate` (string | Date | number): 结束日期
- `includeWorkdays` (boolean): 是否只计算工作日（默认true）

**返回:** `LeaveApplicationResult` - 申请结果

### calculateActualWorkdays(startDate, endDate, leaveRecords)

计算扣除已批准假期的实际工作天数

**参数:**

- `startDate` (string | Date | number): 开始日期
- `endDate` (string | Date | number): 结束日期
- `leaveRecords` (Array): 假期记录数组

**返回:** `number` - 实际工作天数

## 工作日历相关功能

### generateCalendar(year, month, options)

生成指定年月的日历视图

**参数:**

- `year` (number): 年份
- `month` (number): 月份 (1-12)
- `options` (Object): 可选参数
  - `startDay` (number): 每周从哪天开始 (0=周日, 1=周一, 默认1)
  - `includeFestival` (boolean): 是否包含节日信息 (默认true)
  - `includeLunar` (boolean): 是否包含农历信息 (默认false)

**返回:** `Array<Array<CalendarDay>>` - 日历矩阵（周的数组，每周包含7天）

**示例:**

```js
import { generateCalendar } from 'chinese-workday'
const calendar = generateCalendar(2024, 1) // 生成2024年1月日历
```

### generateCompactCalendar(year, month)

生成紧凑格式的日历视图和统计信息

**参数:**

- `year` (number): 年份
- `month` (number): 月份 (1-12)

**返回:** `CompactCalendar` - 包含日历和统计信息的对象

### getDaysInMonth(year, month, type)

获取月份中特定类型的日期

**参数:**

- `year` (number): 年份
- `month` (number): 月份 (1-12)
- `type` (string): 日期类型 ('workdays', 'holidays', 'weekends', 'all') 默认 'workdays'

**返回:** `Array<string>` - 日期字符串数组

## 时区支持功能

### isWorkdayInTimezone(date, timeZone)

检查指定时区的日期是否为工作日

**参数:**

- `date` (string | Date | number): 日期/时间
- `timeZone` (string): 时区 (默认 'Asia/Shanghai')

**返回:** `boolean` - 是否为工作日

**示例:**

```js
import { isWorkdayInTimezone } from 'chinese-workday'
const isWorkday = isWorkdayInTimezone('2024-05-06', 'Asia/Shanghai') // 根据中国时区判断
const isWorkdayInNY = isWorkdayInTimezone('2024-05-06 10:00:00', 'America/New_York') // 根据纽约时区判断
```

### getWorkdayInMultipleTimezones(timestamp, timezones)

获取时间戳在多个时区的工作日状态

**参数:**

- `timestamp` (number | string | Date): 时间戳
- `timezones` (Array<string>): 时区数组

**返回:** `{[timezone: string]: boolean}` - 以时区为键、工作日状态为值的对象

### convertTimezoneAndCheckWorkday(date, fromTimezone, toTimezone, checkWorkday)

将日期从一个时区转换到另一个时区并检查是否为工作日

**参数:**

- `date` (string | Date | number): 要转换的日期
- `fromTimezone` (string): 源时区
- `toTimezone` (string): 目标时区
- `checkWorkday` (boolean): 是否检查转换后的日期在中国是否为工作日 (默认 true)

**返回:** `TimezoneConversionResult` - 转换结果对象

**参数:**

- `year` (number): 年份
- `month` (number): 月份 (1-12)
- `options` (Object): 可选参数
  - `startDay` (number): 每周从哪天开始 (0=周日, 1=周一, 默认1)
  - `includeFestival` (boolean): 是否包含节日信息 (默认true)
  - `includeLunar` (boolean): 是否包含农历信息 (默认false)

**返回:** `Array<Array<CalendarDay>>` - 日历矩阵（周的数组，每周包含7天）

**示例:**

```js
import { generateCalendar } from 'chinese-workday'
const calendar = generateCalendar(2024, 1) // 生成2024年1月日历
```

### generateCompactCalendar(year, month)

生成紧凑格式的日历视图和统计信息

**参数:**

- `year` (number): 年份
- `month` (number): 月份 (1-12)

**返回:** `CompactCalendar` - 包含日历和统计信息的对象

### getDaysInMonth(year, month, type)

获取月份中特定类型的日期

**参数:**

- `year` (number): 年份
- `month` (number): 月份 (1-12)
- `type` (string): 日期类型 ('workdays', 'holidays', 'weekends', 'all') 默认 'workdays'

**返回:** `Array<string>` - 日期字符串数组

## 时区支持功能

### isWorkdayInTimezone(date, timeZone)

检查指定时区的日期是否为工作日

**参数:**

- `date` (string | Date | number): 日期/时间
- `timeZone` (string): 时区 (默认 'Asia/Shanghai')

**返回:** `boolean` - 是否为工作日

**示例:**

```js
import { isWorkdayInTimezone } from 'chinese-workday'
const isWorkday = isWorkdayInTimezone('2024-05-06', 'Asia/Shanghai') // 根据中国时区判断
const isWorkdayInNY = isWorkdayInTimezone('2024-05-06 10:00:00', 'America/New_York') // 根据纽约时区判断
```

### getWorkdayInMultipleTimezones(timestamp, timezones)

获取时间戳在多个时区的工作日状态

**参数:**

- `timestamp` (number | string | Date): 时间戳
- `timezones` (Array<string>): 时区数组

**返回:** `{[timezone: string]: boolean}` - 以时区为键、工作日状态为值的对象

### convertTimezoneAndCheckWorkday(date, fromTimezone, toTimezone, checkWorkday)

将日期从一个时区转换到另一个时区并检查是否为工作日

**参数:**

- `date` (string | Date | number): 要转换的日期
- `fromTimezone` (string): 源时区
- `toTimezone` (string): 目标时区
- `checkWorkday` (boolean): 是否检查转换后的日期在中国是否为工作日 (默认 true)

**返回:** `TimezoneConversionResult` - 转换结果对象

## 类型定义

### AnnualStats

```ts
interface AnnualStats {
  year: number
  totalDays: number
  workdays: number
  holidays: number
  weekends: number
  additionalWorkdays: number
  workdayPercentage: number
  holidayDistribution: { [festival: string]: number }
}
```

### MonthlyStats

```ts
interface MonthlyStats {
  year: number
  month: number
  totalDays: number
  workdays: number
  holidays: number
  weekends: number
  additionalWorkdays: number
  workdayPercentage: number
}
```

### WorkdayRatio

```ts
interface WorkdayRatio {
  startDate: string
  endDate: string
  totalDays: number
  workdays: number
  holidays: number
  weekends: number
  additionalWorkdays: number
  workdayCount: number
  workdayPercentage: number
  holidayPercentage: number
  weekendPercentage: number
}
```

### WorkSchedule

```ts
interface WorkSchedule {
  workdays: number[] // 0=周日, 1=周一, ..., 6=周六
  holidays: string[] // 'YYYY-MM-DD' 格式数组
  workdaysOnWeekends: string[] // 'YYYY-MM-DD' 格式数组
}
```

### OfficeHoursOptions

```ts
interface OfficeHoursOptions {
  startHour?: number
  endHour?: number
  startDay?: number
  endDay?: number
}
```

### LeaveBalances

```ts
interface LeaveBalances {
  annual: number
  sick: number
  personal: number
  marriage: number
  maternity: number
  paternity: number
  custom: { [type: string]: number }
}
```

### CalendarDay

```ts
interface CalendarDay {
  year: number
  month: number
  date: number
  dayType: 'prevMonth' | 'currentMonth' | 'nextMonth'
  isWorkday: boolean
  dateStr: string
  festival?: string
  lunar?: string
}
```

### CalendarOptions

```ts
interface CalendarOptions {
  startDay?: number
  includeFestival?: boolean
  includeLunar?: boolean
}
```

### CompactCalendar

````ts
interface CompactCalendar {
  year: number
  month: number
  calendar: CalendarDay[][]
  stats: {
    workdays: number
    holidays: number
    weekends: number
    total: number
  }
}

### TimezoneConversionResult
```ts
interface TimezoneConversionResult {
  originalDate: string
  convertedDate: string
  isWorkdayInChina: boolean | undefined
  fromTimezone: string
  toTimezone: string
}
````
