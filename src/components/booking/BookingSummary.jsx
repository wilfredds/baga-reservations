import { RESTAURANT } from '../../data/restaurant'
import { formatLongDate, formatTime } from '../../lib/dates'

// The side panel that fills in live as the guest makes choices.
// It reads the same state as the steps, so it can never disagree with them.
export default function BookingSummary({ partySize, dateKey, time, details }) {
  return (
    <aside aria-label="Your reservation so far" className="rounded-3xl border border-stone-200 bg-white p-6 lg:sticky lg:top-24">
      <h3 className="font-display text-2xl">Your reservation</h3>
      <dl className="mt-4 divide-y divide-stone-200 text-sm">
        <Row label="Guests" value={`${partySize} ${partySize === 1 ? 'guest' : 'guests'}`} />
        <Row label="Date" value={dateKey ? formatLongDate(dateKey) : null} />
        <Row label="Time" value={time ? formatTime(time) : null} />
        <Row label="Name" value={details.name.trim() || null} />
      </dl>
      <p className="mt-5 rounded-xl bg-paper p-4 text-xs leading-relaxed text-stone-600">
        Tables are held for {RESTAURANT.holdMinutes} minutes past your booking time. Booking for more than{' '}
        {RESTAURANT.maxPartyOnline}? Email us and we&rsquo;ll arrange it.
      </p>
    </aside>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-3">
      <dt className="text-stone-500">{label}</dt>
      <dd className={value ? 'text-right font-semibold text-charcoal' : 'text-stone-400'}>
        {value ?? 'Not chosen yet'}
      </dd>
    </div>
  )
}
