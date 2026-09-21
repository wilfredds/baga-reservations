import { RESTAURANT } from '../../data/restaurant'
import { downloadCalendarFile } from '../../lib/booking'
import { addMinutesToTime, formatLongDate, formatTime } from '../../lib/dates'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

// The success screen — the booking is done. This is the one moment in the flow
// that has earned a flourish, so the reference flares once and then sits still.
export default function Confirmation({ booking, onStartOver }) {
  const facts = [
    ['Guests', `${booking.partySize} ${booking.partySize === 1 ? 'guest' : 'guests'}`, false],
    ['Date', formatLongDate(booking.dateKey), false],
    ['Time', formatTime(booking.time), true],
  ]

  return (
    <div className="flex flex-col gap-7">
      <div className="anim-rise rounded-2xl bg-leaf-600/15 p-5 ring-1 ring-inset ring-leaf-400/30 sm:p-6">
        <p className="flex items-center gap-2 text-sm font-semibold text-leaf-400">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-leaf-600 text-white">
            <Icon name="check" className="h-3.5 w-3.5" />
          </span>
          Reservation confirmed
        </p>
        <p className="mt-2 text-cooled">Show this reference when you arrive:</p>
        {/* Monospace here is doing its real job — this is a code to read back, character by character. */}
        <p
          className="anim-flare mt-3 inline-block rounded-xl bg-uling px-4 py-2 font-mono text-2xl font-semibold tracking-[0.18em] text-cooled sm:text-3xl"
          style={{ animationDelay: '320ms' }}
        >
          {booking.reference}
        </p>
      </div>

      <dl className="anim-rise grid gap-x-10 gap-y-4 border-y border-ash-dim/45 py-5 sm:grid-cols-3" style={{ animationDelay: '140ms' }}>
        {facts.map(([label, value, numeric]) => (
          <div key={label}>
            <dt className="text-sm text-ash">{label}</dt>
            <dd className={`mt-1 display-sm text-xl text-cooled ${numeric ? 'tabular-nums' : ''}`}>{value}</dd>
          </div>
        ))}
      </dl>

      <p className="text-sm leading-relaxed text-ash">
        We&rsquo;ll hold your table until{' '}
        <strong className="tabular-nums text-cooled">
          {formatTime(addMinutesToTime(booking.time, RESTAURANT.holdMinutes))}
        </strong>
        . If your plans change, email{' '}
        <a
          href={`mailto:${RESTAURANT.email}`}
          className="font-semibold text-ember underline decoration-ember/60 transition-colors duration-150 hover:text-ember"
        >
          {RESTAURANT.email}
        </a>{' '}
        with your reference.
      </p>

      <div className="flex flex-wrap gap-3 border-t border-ash-dim/45 pt-6">
        <Button onClick={() => downloadCalendarFile(booking)}>
          <Icon name="calendar" className="h-4 w-4" />
          Add to calendar
        </Button>
        <Button variant="secondary" onClick={onStartOver}>
          Make another reservation
        </Button>
      </div>
    </div>
  )
}
