import { useEffect, useRef } from 'react'
import { RESTAURANT } from '../../data/restaurant'
import { formatLongDate, formatMonthShort, formatWeekdayShort } from '../../lib/dates'

// A scrollable row of date "chips". Past dates aren't in the list at all,
// and closed days are shown but can't be clicked.
export default function DateStrip({ dates, selectedKey, onSelect, action = null }) {
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

          let look =
            'border-ash-dim bg-uling text-cooled hover:border-ember hover:bg-uling-2 motion-safe:active:scale-95'
          if (day.isClosed) {
            look = 'cursor-not-allowed border-dashed border-ash-dim bg-transparent text-ash'
          } else if (isSelected) {
            // The chosen day glows like a coal that just caught.
            look =
              'border-ember bg-ember text-void shadow-[0_6px_16px_-6px_rgb(226_86_26_/_0.75)] motion-safe:active:scale-95'
          }

          return (
            <button
              key={day.key}
              ref={isSelected ? selectedRef : null}
              type="button"
              disabled={day.isClosed}
              aria-pressed={isSelected}
              aria-label={`${formatLongDate(day.key)}${day.isClosed ? ', closed' : ''}`}
              onClick={() => onSelect(day.key)}
              className={`flex w-[4.5rem] shrink-0 snap-start flex-col items-center rounded-2xl border px-2 py-3 transition-[background-color,border-color,box-shadow,transform,color] duration-200 ease-heat ${look}`}
            >
              <span className="text-[0.7rem] font-semibold uppercase tracking-wider">
                {day.isToday ? 'Today' : formatWeekdayShort(day.date)}
              </span>
              <span className="display-sm text-2xl leading-tight tabular-nums">{day.date.getDate()}</span>
              <span className="text-xs">{day.isClosed ? 'Closed' : formatMonthShort(day.date)}</span>
            </button>
          )
        })}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-xs text-ash">
          Showing the next {RESTAURANT.bookingWindowDays / 7} weeks — scroll sideways for more. We&rsquo;re closed on
          Mondays.
        </p>
        {action}
      </div>
    </div>
  )
}
