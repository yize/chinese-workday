/***********************************************************************
 * Performance Benchmark for Chinese Workday
 * 
 * Run: node benchmark.js
 ***********************************************************************/

'use strict'

const workday = require('./index.js')

// Test data - 100 random dates
const testDates = []
for (let i = 0; i < 100; i++) {
  const year = 2018 + Math.floor(Math.random() * 9)
  const month = 1 + Math.floor(Math.random() * 12)
  const day = 1 + Math.floor(Math.random() * 28)
  testDates.push(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`)
}

console.log('=' .repeat(60))
console.log('Chinese Workday Performance Benchmark')
console.log('=' .repeat(60))

// Warmup
console.log('\n🔥 Warming up cache...')
testDates.forEach(date => {
  workday.isWorkday(date)
  workday.getFestival(date)
})

// Benchmark single queries
console.log('\n📊 Benchmarking single queries (100 dates, 10 iterations)...')
const startSingle = Date.now()
for (let i = 0; i < 10; i++) {
  testDates.forEach(date => {
    workday.isWorkday(date)
    workday.isHoliday(date)
    workday.getFestival(date)
    workday.isAddtionalWorkday(date)
  })
}
const singleTime = Date.now() - startSingle
console.log(`⏱️  Single queries: ${singleTime}ms (${(singleTime / 10).toFixed(2)}ms per iteration)`)

// Benchmark batch queries
console.log('\n📊 Benchmarking batch queries (10 iterations)...')
const startBatch = Date.now()
for (let i = 0; i < 10; i++) {
  workday.isWorkdayBatch(testDates)
  workday.isHolidayBatch(testDates)
  workday.getFestivalBatch(testDates)
}
const batchTime = Date.now() - startBatch
console.log(`⏱️  Batch queries: ${batchTime}ms (${(batchTime / 10).toFixed(2)}ms per iteration)`)

// Cache statistics
console.log('\n📈 Cache Statistics:')
const stats = workday.getCacheStats()
console.log(`  - Cache size: ${stats.size}`)
console.log(`  - Cache hits: ${stats.hits}`)
console.log(`  - Cache misses: ${stats.misses}`)
console.log(`  - Hit rate: ${stats.hitRate.toFixed(2)}%`)

console.log('\n' + '=' .repeat(60))
console.log('Benchmark Complete!')
console.log('=' .repeat(60))
