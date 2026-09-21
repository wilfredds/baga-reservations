import { RESTAURANT, SERVICES } from '../data/restaurant'
import { addDays, fromDateKey, toDateKey, toDateTime } from './dates'

// ---------------------------------------------------------------------------
// This is a STATIC site — there is no server and no database.
// So we simulate availability: some seats are "already taken".
//
// The trick: the same date + time always produces the same number.
// Reload the page and the availability doesn't jump around — it behaves
// like a real booking system would. That's what "deterministic" means.
// ---------------------------------------------------------------------------

// Turns text like "2026-09-22 19:00" into a big number (the FNV-1a hash).
// Same text in -> same number out, every time.
function hashText(text) {
  let hash = 2166136261
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0 // make it a positive whole number
}

const PEAK_TIMES = ['12:00', '12:30', '19:00', '19:30']

// How many seats are already booked for this date and time?
// Weekends and peak hours are busier, like a real restaurant.
function seatsTaken(dateKey, time) {
  const weekday = fromDateKey(dateKey).getDay()
  const isWeekend = weekday === 5 || weekday === 6 || weekday === 0 // Fri, Sat, Sun
  const isPeak = PEAK_TIMES.includes(time)

  const base = hashText(`${dateKey} ${time}`) % 14 // a number from 0 to 13
  const extra = (isWeekend ? 6 : 0) + (isPeak ? 5 : 0)

  return Math.min(RESTAURANT.seatsPerSlot, base + extra)
}

// The list of dates shown in the date picker: today plus the next few weeks.
// Past dates are never in this list, so a guest simply CAN'T pick one.
export function getBookableDates(now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  return Array.from({ length: RESTAURANT.bookingWindowDays }, (_, index) => {
    const date = addDays(today, index)
    return {
      key: toDateKey(date),
      date,
      isToday: index === 0,
      isClosed: date.getDay() === RESTAURANT.closedWeekday,
    }
  })
}

// Every time slot for one date, each marked available or not — and WHY not.
export function getSlotsForDate(dateKey, partySize, now = new Date()) {
  const isToday = dateKey === toDateKey(now)
  const earliestBookable = new Date(now.getTime() + RESTAURANT.leadTimeMinutes * 60 * 1000)

  return SERVICES.map((service) => ({
    id: service.id,
    label: service.label,
    slots: service.times.map((time) => {
      const seatsLeft = RESTAURANT.seatsPerSlot - seatsTaken(dateKey, time)

      let reason = null
      if (isToday && toDateTime(dateKey, time) < earliestBookable) {
        reason = 'Too late to book'
      } else if (seatsLeft === 0) {
        reason = 'Fully booked'
      } else if (seatsLeft < partySize) {
        reason = `Only ${seatsLeft} seat${seatsLeft === 1 ? '' : 's'} left`
      }

      return { time, seatsLeft, available: reason === null, reason }
    }),
  }))
}

export function isSlotAvailable(dateKey, time, partySize, now = new Date()) {
  return getSlotsForDate(dateKey, partySize, now)
    .flatMap((service) => service.slots)
    .some((slot) => slot.time === time && slot.available)
}

export function hasAnyAvailableSlot(dateKey, partySize, now = new Date()) {
  return getSlotsForDate(dateKey, partySize, now).some((service) =>
    service.slots.some((slot) => slot.available),
  )
}

// When a day has nothing left, find the next open day to suggest instead.
export function findNextOpenDate(afterKey, partySize, now = new Date()) {
  const next = getBookableDates(now).find(
    (day) => day.key > afterKey && !day.isClosed && hasAnyAvailableSlot(day.key, partySize, now),
  )
  return next ? next.key : null
}
