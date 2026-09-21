import { useEffect, useRef } from 'react'
import { RESTAURANT } from '../../data/restaurant'
import { formatLongDate, formatMonthShort, formatWeekdayShort } from '../../lib/dates'

// A scrollable row of date "chips". Past dates aren't in the list at all,
// and closed days are shown but can't be clicked.
export default function DateStrip({ dates, selectedKey, onSelect }) {
  // When the selected date changes (for example, "Show next open day" was clicked),
  // scroll that chip into view inside the strip.
  const selectedRef = useRef(null)
  useEffect(() => {
    const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    selectedRef.current?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: prefersLessMotion ? 'auto' : 'smooth',
    })
  }, [selectedKey])

  return (
    <div>
      <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-3">
        {dates.map((day) => {
          const isSelected = day.key === selectedKey

          let look = 'border-stone-300 bg-white text-charcoal hover:border-ember-600'
          if (day.isClosed) look = 'cursor-not-allowed border-dashed border-stone-300 bg-transparent text-stone-400'
          else if (isSelected) look = 'border-ember-600 bg-ember-600 text-white'

          return (
            <button
              key={day.key}
              ref={isSelected ? selectedRef : null}
              type="button"
              disabled={day.isClosed}
              aria-pressed={isSelected}
              aria-label={`${formatLongDate(day.key)}${day.isClosed ? ', closed' : ''}`}
              onClick={() => onSelect(day.key)}
              className={`flex w-[4.5rem] shrink-0 snap-start flex-col items-center rounded-2xl border px-2 py-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-600 ${look}`}
            >
              <span className="text-[0.7rem] font-semibold uppercase tracking-wider">
                {day.isToday ? 'Today' : formatWeekdayShort(day.date)}
              </span>
              <span className="font-display text-2xl leading-tight">{day.date.getDate()}</span>
              <span className="text-xs">{day.isClosed ? 'Closed' : formatMonthShort(day.date)}</span>
            </button>
          )
        })}
      </div>
      <p className="text-xs text-stone-500">
        Showing the next {RESTAURANT.bookingWindowDays / 7} weeks — scroll sideways for more. We&rsquo;re closed on
        Mondays.
      </p>
    </div>
  )
}
