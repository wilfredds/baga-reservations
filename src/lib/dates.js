// Small helpers for working with dates and times.
// We store a date as a simple text "key" like "2026-09-22" — easy to compare and save.

const pad = (n) => String(n).padStart(2, '0')

// Date -> "2026-09-22", using LOCAL time.
// Why not date.toISOString()? It converts to UTC first. The Philippines is UTC+8,
// so before 8:00 AM toISOString() would give you YESTERDAY's date. A classic bug.
export function toDateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

// "2026-09-22" -> a Date at midnight, local time.
export function fromDateKey(key) {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day) // JavaScript months start at 0
}

export function addDays(date, days) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

// Combine a date key and a "19:30" time into one real Date.
export function toDateTime(dateKey, time) {
  const [hours, minutes] = time.split(':').map(Number)
  const date = fromDateKey(dateKey)
  date.setHours(hours, minutes, 0, 0)
  return date
}

// "13:30" -> "1:30 PM"
export function formatTime(time) {
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const hour12 = hours % 12 === 0 ? 12 : hours % 12
  return `${hour12}:${pad(minutes)} ${period}`
}

// "19:00" + 15 -> "19:15"
export function addMinutesToTime(time, minutesToAdd) {
  const [hours, minutes] = time.split(':').map(Number)
  const total = hours * 60 + minutes + minutesToAdd
  return `${pad(Math.floor(total / 60) % 24)}:${pad(total % 60)}`
}

// "2026-09-22" -> "Tuesday, September 22"
export function formatLongDate(key) {
  return fromDateKey(key).toLocaleDateString('en-PH', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export function formatWeekdayShort(date) {
  return date.toLocaleDateString('en-PH', { weekday: 'short' })
}

export function formatMonthShort(date) {
  return date.toLocaleDateString('en-PH', { month: 'short' })
}

const peso = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
})

// 420 -> "₱420"
export function formatPeso(amount) {
  return peso.format(amount)
}
