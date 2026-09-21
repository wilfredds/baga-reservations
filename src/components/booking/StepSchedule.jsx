import { useMemo, useState } from 'react'
import { RESTAURANT } from '../../data/restaurant'
import { findNextOpenDate, getBookableDates, getSlotsForDate } from '../../lib/availability'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { fromDateKey, toDateKey } from '../../lib/dates'
import PartySizePicker from './PartySizePicker'
import DateStrip from './DateStrip'
import TimeSlots from './TimeSlots'

// STEP 1 — party size, date and time.
export default function StepSchedule({
  partySize,
  onPartySizeChange,
  dateKey,
  onDateChange,
  time,
  onTimeChange,
  onContinue,
}) {
  // useMemo = "remember this result, and only recalculate when these inputs change".
  const dates = useMemo(() => getBookableDates(), [])
  const [calendarOpen, setCalendarOpen] = useState(false)

  // The calendar and the strip obey exactly one set of rules: a day is pickable
  // only if it's in the booking window and we're open. Deriving the set from the
  // same list the strip renders means the two can never disagree.
  const bookableKeys = useMemo(
    () => new Set(dates.filter((day) => !day.isClosed).map((day) => day.key)),
    [dates],
  )

  // The time slots are DERIVED from the date and party size — we never store them in state.
  // If you can calculate something from state you already have, calculate it.
  const services = useMemo(
    () => (dateKey ? getSlotsForDate(dateKey, partySize) : null),
    [dateKey, partySize],
  )

  const isDayFull = services !== null && services.every((s) => s.slots.every((slot) => !slot.available))
  const nextOpenDate = useMemo(
    () => (isDayFull ? findNextOpenDate(dateKey, partySize) : null),
    [isDayFull, dateKey, partySize],
  )

  const missing = !dateKey ? 'Choose a date to continue.' : !time ? 'Choose a time to continue.' : null

  return (
    <div className="flex flex-col gap-8">
      {/* min-w-0: browsers give <fieldset> a default minimum width equal to its content,
          so without this the scrolling date strip would stretch the whole page on phones. */}
      <fieldset className="min-w-0">
        <legend className="text-sm font-semibold text-cooled">How many guests?</legend>
        <div className="mt-3">
          <PartySizePicker value={partySize} max={RESTAURANT.maxPartyOnline} onChange={onPartySizeChange} />
        </div>
      </fieldset>

      <fieldset className="min-w-0">
        <legend className="text-sm font-semibold text-cooled">Pick a date</legend>
        <div className="mt-3">
          <DateStrip
            dates={dates}
            selectedKey={dateKey}
            onSelect={onDateChange}
            action={
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="secondary" size="sm">
                    <Icon name="calendar" className="h-4 w-4" />
                    Open calendar
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-auto rounded-2xl border-ash-dim/45 p-2">
                  <Calendar
                    mode="single"
                    selected={dateKey ? fromDateKey(dateKey) : undefined}
                    defaultMonth={dateKey ? fromDateKey(dateKey) : dates[0].date}
                    startMonth={dates[0].date}
                    endMonth={dates[dates.length - 1].date}
                    disabled={(day) => !bookableKeys.has(toDateKey(day))}
                    onSelect={(day) => {
                      if (!day) return
                      onDateChange(toDateKey(day))
                      setCalendarOpen(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
            }
          />
        </div>
      </fieldset>

      <fieldset className="min-w-0">
        <legend className="text-sm font-semibold text-cooled">Pick a time</legend>
        <div className="mt-3">
          <TimeSlots
            key={`${dateKey ?? 'none'}-${partySize}`}
            services={services}
            isDayFull={isDayFull}
            partySize={partySize}
            selectedTime={time}
            onSelect={onTimeChange}
            nextOpenDate={nextOpenDate}
            onJumpToDate={onDateChange}
          />
        </div>
      </fieldset>

      <div className="flex flex-col-reverse items-stretch gap-3 border-t border-ash-dim/45 pt-6 sm:flex-row sm:items-center sm:justify-between">
        {/* aria-live: screen readers announce this text whenever it changes. */}
        <p aria-live="polite" className="text-sm text-ash">
          {missing ?? 'Looking good — next, your details.'}
        </p>
        <Button size="lg" onClick={onContinue} disabled={Boolean(missing)}>
          Continue
        </Button>
      </div>
    </div>
  )
}
