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
<script src="https://cdn.jsdelivr.net/npm/chinese-workday@1.16.1/dist/chinese-workday.min.js"></script>
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

| 方法                             | 说明             |
| -------------------------------- | ---------------- |
| `countWorkdays(start, end)`      | 计算工作日数量   |
| `getWorkdaysInRange(start, end)` | 获取所有工作日   |
| `getHolidaysInRange(start, end)` | 获取所有节假日   |
| `nextWorkday(date)`              | 获取下一个工作日 |
| `previousWorkday(date)`          | 获取上一个工作日 |

### 其他

| 方法                  | 说明         |
| --------------------- | ------------ |
| `getCacheStats()`     | 获取缓存统计 |
| `addDays(date, days)` | 日期加减     |

### 支持的输入格式

```js
isWorkday('2024-10-01') // 字符串
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
