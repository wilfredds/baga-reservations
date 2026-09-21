import { RESTAURANT } from '../data/restaurant'
import { toDateTime } from './dates'

// A booking reference like "BAGA-7K3F9Q".
// We leave out 0/O and 1/I because guests read these out loud and they look alike.
const REFERENCE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function makeReference() {
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += REFERENCE_CHARS[Math.floor(Math.random() * REFERENCE_CHARS.length)]
  }
  return `BAGA-${code}`
}

// Pretend to talk to a server: wait a little, then carry on.
// This lets us build and show a real "loading" state.
export function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

// ---------------------------------------------------------------------------
// "Add to calendar": we build a tiny .ics file (the format every calendar app
// understands) right in the browser, then download it. No server needed.
// ---------------------------------------------------------------------------

const pad = (n) => String(n).padStart(2, '0')

// Local time, "floating": 20260922T190000 — the calendar treats it as the guest's own timezone.
function localStamp(date) {
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`
}

// The ICS standard requires the "created at" stamp in UTC, ending with Z.
function utcStamp(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

export function buildCalendarFile(booking) {
  const start = toDateTime(booking.dateKey, booking.time)
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000) // plan for a 2-hour meal
  const meal = start.getHours() < 15 ? 'Lunch' : 'Dinner'

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Baga//Reservations//EN',
    'BEGIN:VEVENT',
    `UID:${booking.reference}@baga.example`,
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART:${localStamp(start)}`,
    `DTEND:${localStamp(end)}`,
    `SUMMARY:${meal} at ${RESTAURANT.name} (${booking.partySize} guests)`,
    `DESCRIPTION:Booking reference ${booking.reference}. Your table is held for ${RESTAURANT.holdMinutes} minutes.`,
    `LOCATION:${RESTAURANT.name}\\, ${RESTAURANT.city.replace(',', '\\,')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function downloadCalendarFile(booking) {
  const file = new Blob([buildCalendarFile(booking)], { type: 'text/calendar' })
  const url = URL.createObjectURL(file)

  const link = document.createElement('a')
  link.href = url
  link.download = `${booking.reference}.ics`
  document.body.appendChild(link)
  link.click()
  link.remove()

  // Free the memory a moment later, once the download has started.
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
