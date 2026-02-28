/***********************************************************************
 * Performance Comparison for Chinese Workday
 *
 * Run: node performance-comparison.js
 ***********************************************************************/

import * as workday from '../src/index.js'

// Generate test data - 1000 random dates across multiple years
const testDates = []
for (let i = 0; i < 1000; i++) {
  const year = 2011 + Math.floor(Math.random() * 16) // 2011-2026
  const month = 1 + Math.floor(Math.random() * 12)
  const day = 1 + Math.floor(Math.random() * 28)
  testDates.push(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`)
}

console.log('='.repeat(70))
console.log('Chinese Workday Performance Comparison')
console.log('='.repeat(70))

// Test single query performance
console.log('\n🔬 Single Query Performance Tests')
console.log('-'.repeat(40))

// Warmup
console.log('🔥 Warming up...')
for (let i = 0; i < 100; i++) {
  workday.isWorkday(testDates[i % testDates.length])
  workday.getFestival(testDates[i % testDates.length])
}

// Single query performance test
console.log('\n⏱️  Testing single queries...')
let start = Date.now()
for (let i = 0; i < 1000; i++) {
  workday.isWorkday(testDates[i % testDates.length])
}
const singleIsWorkdayTime = Date.now() - start

start = Date.now()
for (let i = 0; i < 1000; i++) {
  workday.getFestival(testDates[i % testDates.length])
}
const singleGetFestivalTime = Date.now() - start

start = Date.now()
for (let i = 0; i < 1000; i++) {
  workday.isHoliday(testDates[i % testDates.length])
}
const singleIsHolidayTime = Date.now() - start

start = Date.now()
for (let i = 0; i < 1000; i++) {
  workday.isAddtionalWorkday(testDates[i % testDates.length])
}
const singleIsAdditionalWorkdayTime = Date.now() - start

console.log(`   isWorkday:     ${singleIsWorkdayTime}ms (1000 calls)`)
console.log(`   getFestival:   ${singleGetFestivalTime}ms (1000 calls)`)
console.log(`   isHoliday:     ${singleIsHolidayTime}ms (1000 calls)`)
console.log(`   isAddtional:   ${singleIsAdditionalWorkdayTime}ms (1000 calls)`)

// Test batch query performance
console.log('\n📦 Batch Query Performance Tests')
console.log('-'.repeat(40))

start = Date.now()
for (let i = 0; i < 100; i++) {
  workday.isWorkdayBatch(testDates)
}
const batchIsWorkdayTime = Date.now() - start

start = Date.now()
for (let i = 0; i < 100; i++) {
  workday.getFestivalBatch(testDates)
}
const batchGetFestivalTime = Date.now() - start

start = Date.now()
for (let i = 0; i < 100; i++) {
  workday.isHolidayBatch(testDates)
}
const batchIsHolidayTime = Date.now() - start

console.log(
  `   isWorkdayBatch:    ${batchIsWorkdayTime}ms (100 calls, ${testDates.length} dates each)`
)
console.log(
  `   getFestivalBatch:  ${batchGetFestivalTime}ms (100 calls, ${testDates.length} dates each)`
)
console.log(
  `   isHolidayBatch:    ${batchIsHolidayTime}ms (100 calls, ${testDates.length} dates each)`
)

// Advanced functions test
console.log('\n⚙️  Advanced Functions Performance Tests')
console.log('-'.repeat(40))

// Test range functions
start = Date.now()
for (let i = 0; i < 10; i++) {
  workday.countWorkdays('2024-01-01', '2024-12-31')
}
const countWorkdaysTime = Date.now() - start

start = Date.now()
for (let i = 0; i < 10; i++) {
  workday.getWorkdaysInRange('2024-01-01', '2024-01-31')
}
const getWorkdaysInRangeTime = Date.now() - start

start = Date.now()
for (let i = 0; i < 10; i++) {
  workday.getHolidaysInRange('2024-01-01', '2024-12-31')
}
const getHolidaysInRangeTime = Date.now() - start

start = Date.now()
for (let i = 0; i < 100; i++) {
  workday.nextWorkday(testDates[i % testDates.length])
}
const nextWorkdayTime = Date.now() - start

console.log(`   countWorkdays:        ${countWorkdaysTime}ms (10 calls)`)
console.log(`   getWorkdaysInRange:   ${getWorkdaysInRangeTime}ms (10 calls)`)
console.log(`   getHolidaysInRange:   ${getHolidaysInRangeTime}ms (10 calls)`)
console.log(`   nextWorkday:          ${nextWorkdayTime}ms (100 calls)`)

// Test lunar calendar performance
console.log('\n🌙 Lunar Calendar Performance Tests')
console.log('-'.repeat(40))

start = Date.now()
for (let i = 0; i < 1000; i++) {
  workday.getLunarInfo(testDates[i % testDates.length])
}
const getLunarInfoTime = Date.now() - start

console.log(`   getLunarInfo:         ${getLunarInfoTime}ms (1000 calls)`)

// Cache statistics
console.log('\n📈 Cache Statistics:')
const stats = workday.getCacheStats()
console.log(`  - Cache size: ${stats.size}`)
console.log(`  - Cache hits: ${stats.hits}`)
console.log(`  - Cache misses: ${stats.misses}`)
console.log(`  - Hit rate: ${stats.hitRate.toFixed(2)}%`)

// Calculate performance summary
const totalOps = 4000 + testDates.length * 300 + 400 + 1000 // approx total operations
const totalTime =
  singleIsWorkdayTime +
  singleGetFestivalTime +
  singleIsHolidayTime +
  singleIsAdditionalWorkdayTime +
  batchIsWorkdayTime +
  batchGetFestivalTime +
  batchIsHolidayTime +
  countWorkdaysTime +
  getWorkdaysInRangeTime +
  getHolidaysInRangeTime +
  nextWorkdayTime +
  getLunarInfoTime

console.log('\n📊 Performance Summary:')
console.log(`  - Total operations: ~${totalOps.toLocaleString()}`)
console.log(`  - Total time: ${totalTime}ms`)
console.log(
  `  - Operations per second: ~${Math.round((totalOps / totalTime) * 1000).toLocaleString()}`
)

console.log('\n' + '='.repeat(70))
console.log('Performance Comparison Complete!')
console.log('='.repeat(70))
