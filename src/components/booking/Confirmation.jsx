import { RESTAURANT } from '../../data/restaurant'
import { downloadCalendarFile } from '../../lib/booking'
import { addMinutesToTime, formatLongDate, formatTime } from '../../lib/dates'
import Button from '../ui/Button'

// The success screen — the booking is done.
export default function Confirmation({ booking, onStartOver }) {
  const facts = [
    ['Guests', `${booking.partySize} ${booking.partySize === 1 ? 'guest' : 'guests'}`],
    ['Date', formatLongDate(booking.dateKey)],
    ['Time', formatTime(booking.time)],
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl bg-leaf-50 p-5 ring-1 ring-inset ring-leaf-600/20 sm:p-6">
        <p className="text-sm font-semibold text-leaf-700">Reservation confirmed</p>
        <p className="mt-1 text-stone-700">Show this reference when you arrive:</p>
        <p className="mt-3 font-mono text-2xl font-semibold tracking-[0.18em] text-charcoal sm:text-3xl">
          {booking.reference}
        </p>
      </div>

      <dl className="grid gap-3 sm:grid-cols-3">
        {facts.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-stone-200 bg-white p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">{label}</dt>
            <dd className="mt-1 font-display text-xl text-charcoal">{value}</dd>
          </div>
        ))}
      </dl>

      <p className="text-sm leading-relaxed text-stone-600">
        We&rsquo;ll hold your table until{' '}
        <strong className="text-charcoal">
          {formatTime(addMinutesToTime(booking.time, RESTAURANT.holdMinutes))}
        </strong>
        . If your plans change, email{' '}
        <a href={`mailto:${RESTAURANT.email}`} className="font-semibold text-ember-700 underline underline-offset-2">
          {RESTAURANT.email}
        </a>{' '}
        with your reference.
      </p>

      <div className="flex flex-wrap gap-3 border-t border-stone-200 pt-6">
        <Button onClick={() => downloadCalendarFile(booking)}>Add to calendar</Button>
        <Button variant="secondary" onClick={onStartOver}>
          Make another reservation
        </Button>
      </div>
    </div>
  )
}
