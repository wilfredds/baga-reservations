import { formatLongDate, formatTime } from '../../lib/dates'
import Button from '../ui/Button'

// The time-slot buttons, grouped into Lunch and Dinner.
// Every unavailable slot says WHY — "Fully booked", "Only 3 seats left", "Too late to book".
export default function TimeSlots({
  services,
  isDayFull,
  partySize,
  selectedTime,
  onSelect,
  nextOpenDate,
  onJumpToDate,
}) {
  // Empty state 1: no date chosen yet.
  if (!services) {
    return (
      <p className="rounded-2xl border border-dashed border-stone-300 bg-white px-5 py-6 text-center text-sm text-stone-500">
        Choose a date above and the available times will appear here.
      </p>
    )
  }

  // Empty state 2: a date is chosen, but nothing is left — so help them find another day.
  if (isDayFull) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-5 py-6 text-center">
        <p className="font-semibold text-charcoal">
          No tables left for {partySize} {partySize === 1 ? 'guest' : 'guests'} on this day.
        </p>
        {nextOpenDate ? (
          <>
            <p className="mt-1 text-sm text-stone-600">The next day with space is {formatLongDate(nextOpenDate)}.</p>
            <Button variant="secondary" className="mt-4" onClick={() => onJumpToDate(nextOpenDate)}>
              Show {formatLongDate(nextOpenDate)}
            </Button>
          </>
        ) : (
          <p className="mt-1 text-sm text-stone-600">Try a smaller group, or email us and we&rsquo;ll help.</p>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {services.map((service) => (
        <div key={service.id}>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">{service.label}</p>

          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {service.slots.map((slot) => {
              const isSelected = slot.time === selectedTime

              let note = slot.reason // why it's unavailable
              if (slot.available) {
                note = slot.seatsLeft <= 6 ? `${slot.seatsLeft} seat${slot.seatsLeft === 1 ? '' : 's'} left` : 'Available'
              }

              let look = 'border-stone-300 bg-white text-charcoal hover:border-ember-600'
              let noteColour = slot.seatsLeft <= 6 ? 'text-ember-700' : 'text-leaf-600'
              if (!slot.available) {
                look = 'cursor-not-allowed border-transparent bg-stone-100 text-stone-400'
                noteColour = 'text-stone-400'
              } else if (isSelected) {
                look = 'border-ember-600 bg-ember-600 text-white'
                noteColour = 'text-ember-100'
              }

              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  aria-pressed={isSelected}
                  onClick={() => onSelect(slot.time)}
                  className={`rounded-xl border px-2 py-2.5 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-600 ${look}`}
                >
                  <span className="block text-sm font-semibold">{formatTime(slot.time)}</span>
                  <span className={`block text-[0.7rem] leading-tight ${noteColour}`}>{note}</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
