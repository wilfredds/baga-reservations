import { useState } from 'react'
import { RESTAURANT } from '../../data/restaurant'
import { wait } from '../../lib/booking'
import { formatLongDate, formatTime } from '../../lib/dates'
import Button from '../ui/Button'

// STEP 3 — show everything back, get agreement to the holding policy, then confirm.
export default function StepReview({ partySize, dateKey, time, details, onEdit, onBack, onConfirm }) {
  const [agreed, setAgreed] = useState(false)
  const [showAgreeError, setShowAgreeError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleConfirm() {
    if (isSubmitting) return // ignore double-clicks while we're already confirming
    if (!agreed) {
      setShowAgreeError(true)
      return
    }
    setIsSubmitting(true)
    await wait(1200) // a real site would send the booking to a server here
    onConfirm()
  }

  const scheduleRows = [
    ['Guests', `${partySize} ${partySize === 1 ? 'guest' : 'guests'}`],
    ['Date', formatLongDate(dateKey)],
    ['Time', formatTime(time)],
  ]

  const detailRows = [
    ['Name', details.name.trim()],
    ['Mobile', details.phone.trim()],
    ['Email', details.email.trim()],
  ]
  if (details.occasion !== 'None') detailRows.push(['Occasion', details.occasion])
  if (details.notes.trim()) detailRows.push(['Requests', details.notes.trim()])

  return (
    <div className="flex flex-col gap-5">
      <ReviewCard title="Date & time" rows={scheduleRows} onEdit={() => onEdit(1)} disabled={isSubmitting} />
      <ReviewCard title="Your details" rows={detailRows} onEdit={() => onEdit(2)} disabled={isSubmitting} />

      <div>
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-ash-dim bg-uling p-4">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(event) => {
              setAgreed(event.target.checked)
              if (event.target.checked) setShowAgreeError(false)
            }}
            aria-invalid={showAgreeError ? true : undefined}
            aria-describedby={showAgreeError ? 'agree-error' : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 accent-ember"
          />
          <span className="text-sm leading-relaxed text-cooled">
            I understand my table is held for {RESTAURANT.holdMinutes} minutes after {formatTime(time)}. After
            that, it may be given to walk-in guests.
          </span>
        </label>
        {showAgreeError && (
          <p id="agree-error" role="alert" className="mt-2 text-sm font-medium text-destructive">
            Please tick the box to confirm you&rsquo;ve read the holding policy.
          </p>
        )}
      </div>

      {/* Announces the loading state to screen readers. */}
      <p aria-live="polite" className="sr-only">
        {isSubmitting ? 'Confirming your reservation…' : ''}
      </p>

      <div className="flex items-center justify-between gap-3 border-t border-ash-dim/45 pt-6">
        <Button variant="ghost" onClick={onBack} disabled={isSubmitting}>
          ← Back
        </Button>
        {/* aria-disabled (not disabled) keeps the button's colour while loading;
            the if (isSubmitting) return above does the actual blocking. */}
        <Button
          size="lg"
          onClick={handleConfirm}
          aria-disabled={isSubmitting}
          className={isSubmitting ? 'cursor-wait opacity-90' : ''}
        >
          {isSubmitting ? (
            <>
              <Spinner /> Confirming…
            </>
          ) : (
            'Confirm reservation'
          )}
        </Button>
      </div>
    </div>
  )
}

function ReviewCard({ title, rows, onEdit, disabled }) {
  return (
    <div className="rounded-2xl border border-ash-dim/45 bg-uling p-5">
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-semibold text-cooled">{title}</h4>
        <Button variant="ghost" size="sm" onClick={onEdit} disabled={disabled}>
          Change
        </Button>
      </div>
      <dl className="mt-3 divide-y divide-ash-dim/45 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-6 py-2.5">
            <dt className="text-ash">{label}</dt>
            <dd className="text-right font-medium break-words text-cooled">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function Spinner() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4 animate-spin motion-reduce:animate-none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
      <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" className="opacity-90" />
    </svg>
  )
}
