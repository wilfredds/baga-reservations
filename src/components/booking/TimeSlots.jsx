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
      <p className="anim-step rounded-2xl border border-dashed border-ash-dim bg-uling px-5 py-6 text-center text-sm text-ash">
        Choose a date above and the available times will appear here.
      </p>
    )
  }

  // Empty state 2: a date is chosen, but nothing is left — so help them find another day.
  if (isDayFull) {
    return (
      <div className="anim-step rounded-2xl border border-dashed border-ash-dim bg-uling px-5 py-6 text-center">
        <p className="font-semibold text-cooled">
          No tables left for {partySize} {partySize === 1 ? 'guest' : 'guests'} on this day.
        </p>
        {nextOpenDate ? (
          <>
            <p className="mt-1 text-sm text-ash">The next day with space is {formatLongDate(nextOpenDate)}.</p>
            <Button variant="secondary" className="mt-4" onClick={() => onJumpToDate(nextOpenDate)}>
              Show {formatLongDate(nextOpenDate)}
            </Button>
          </>
        ) : (
          <p className="mt-1 text-sm text-ash">Try a smaller group, or email us and we&rsquo;ll help.</p>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {services.map((service) => (
        <div key={service.id}>
          <p className="text-sm font-semibold text-cooled">{service.label}</p>

          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {service.slots.map((slot, index) => {
              const isSelected = slot.time === selectedTime

              let note = slot.reason // why it's unavailable
              if (slot.available) {
                note = slot.seatsLeft <= 6 ? `${slot.seatsLeft} seat${slot.seatsLeft === 1 ? '' : 's'} left` : 'Available'
              }

              let look =
                'border-ash-dim bg-uling text-cooled hover:border-ember hover:bg-uling-2 motion-safe:active:scale-95'
              let noteColour = slot.seatsLeft <= 6 ? 'text-ember' : 'text-leaf-400'
              if (!slot.available) {
                look = 'cursor-not-allowed border-transparent bg-uling-2 text-ash'
                noteColour = 'text-ash'
              } else if (isSelected) {
                look =
                  'border-ember bg-ember text-void shadow-[0_6px_16px_-6px_rgb(226_86_26_/_0.75)] motion-safe:active:scale-95'
                noteColour = 'text-void/75'
              }

              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  aria-pressed={isSelected}
                  onClick={() => onSelect(slot.time)}
                  style={{ animationDelay: `${Math.min(index * 22, 280)}ms` }}
                  className={`anim-step rounded-xl border px-2 py-2.5 text-center transition-[background-color,border-color,box-shadow,transform,color] duration-200 ease-heat ${look}`}
                >
                  <span className="block text-sm font-semibold tabular-nums">{formatTime(slot.time)}</span>
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
