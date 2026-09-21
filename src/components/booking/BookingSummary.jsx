import { RESTAURANT } from '../../data/restaurant'
import { formatLongDate, formatTime } from '../../lib/dates'
import Icon from '../ui/Icon'

// The side panel that fills in live as the guest makes choices.
// It reads the same state as the steps, so it can never disagree with them.
export default function BookingSummary({ partySize, dateKey, time, details }) {
  return (
    <aside
      aria-label="Your reservation so far"
      className="lit-edge rounded-2xl border border-ash-dim/45 bg-uling p-6 lg:sticky lg:top-24"
    >
      <h3 className="display-sm text-2xl">Your reservation</h3>

      <dl className="mt-4 divide-y divide-ash-dim/45 text-sm">
        <Row label="Guests" value={`${partySize} ${partySize === 1 ? 'guest' : 'guests'}`} />
        <Row label="Date" value={dateKey ? formatLongDate(dateKey) : null} />
        <Row label="Time" value={time ? formatTime(time) : null} numeric />
        <Row label="Name" value={details.name.trim() || null} />
      </dl>

      <p className="mt-5 rounded-xl bg-void p-4 text-xs leading-relaxed text-ash">
        Tables are held for {RESTAURANT.holdMinutes} minutes past your booking time. Booking for more than{' '}
        {RESTAURANT.maxPartyOnline}? Email us and we&rsquo;ll arrange it.
      </p>

      {/* The column used to run out of content halfway down. These are the two
          things a guest actually wants next to the form, so the space earns itself. */}
      <div className="mt-6 space-y-3 border-t border-ash-dim/45 pt-5 text-sm">
        <p className="flex items-start gap-2.5 text-ash">
          <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
          <span>Arrive a few minutes early — the coals are already going.</span>
        </p>
        <p className="flex items-start gap-2.5 text-ash">
          <Icon name="calendar" className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
          <span>
            Need to change it? Email{' '}
            <a
              href={`mailto:${RESTAURANT.email}`}
              className="font-semibold text-ember underline decoration-ember/60 transition-colors duration-150 hover:text-ember"
            >
              {RESTAURANT.email}
            </a>{' '}
            with your reference.
          </span>
        </p>
      </div>
    </aside>
  )
}

function Row({ label, value, numeric = false }) {
  return (
    <div className="flex justify-between gap-4 py-3">
      <dt className="text-ash">{label}</dt>
      {/* key={value} replays a short tick, so the panel visibly answers each choice. */}
      <dd
        key={value ?? 'empty'}
        className={`anim-step text-right ${numeric ? 'tabular-nums ' : ''}${
          value ? 'font-semibold text-cooled' : 'text-ash'
        }`}
        style={{ animationDuration: '220ms' }}
      >
        {value ?? 'Not chosen yet'}
      </dd>
    </div>
  )
}
