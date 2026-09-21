import { useEffect, useRef, useState } from 'react'
import { RESTAURANT } from '../../data/restaurant'
import { isSlotAvailable } from '../../lib/availability'
import { makeReference } from '../../lib/booking'
import StepIndicator from './StepIndicator'
import StepSchedule from './StepSchedule'
import StepDetails from './StepDetails'
import StepReview from './StepReview'
import Confirmation from './Confirmation'
import BookingSummary from './BookingSummary'

const STEPS = [
  { number: 1, label: 'Date & time', title: 'When would you like to come?' },
  { number: 2, label: 'Your details', title: 'Who is the booking for?' },
  { number: 3, label: 'Review', title: 'Check everything, then confirm' },
]
const DONE = 4

const EMPTY_DETAILS = { name: '', phone: '', email: '', occasion: 'None', notes: '' }


// This component OWNS the booking. All the answers live here, in state.
// The step components below only DISPLAY data and REPORT changes back up
// through the on... functions. That pattern is called "lifting state up".

export default function BookingSection() {
  const [step, setStep] = useState(1)
  const [partySize, setPartySize] = useState(2)
  const [dateKey, setDateKey] = useState(null) // e.g. "2026-09-23"
  const [time, setTime] = useState(null) // e.g. "19:00"
  const [details, setDetails] = useState(EMPTY_DETAILS)
  const [booking, setBooking] = useState(null) // filled in once confirmed

  // Accessibility: when the step changes, move keyboard focus to the new heading,
  // so keyboard and screen-reader users land at the start of the new step.
  // We compare with the previous step so nothing happens on the first page load.
  const headingRef = useRef(null)
  const previousStep = useRef(step)
  useEffect(() => {
    if (previousStep.current !== step) {
      headingRef.current?.focus()
      previousStep.current = step
    }
  }, [step])

  function handlePartySizeChange(size) {
    setPartySize(size)
    // A bigger group might not fit the time they already picked. If so, clear it —
    // we handle this right here in the event, instead of in a useEffect.
    if (dateKey && time && !isSlotAvailable(dateKey, time, size)) {
      setTime(null)
    }
  }

  function handleDateChange(key) {
    setDateKey(key)
    // Keep their chosen time if it's also free on the new date; otherwise clear it.
    if (time && !isSlotAvailable(key, time, partySize)) {
      setTime(null)
    }
  }

  function handleConfirm() {
    setBooking({ reference: makeReference(), partySize, dateKey, time, ...details })
    setStep(DONE)
  }

  function handleStartOver() {
    setPartySize(2)
    setDateKey(null)
    setTime(null)
    setDetails(EMPTY_DETAILS)
    setBooking(null)
    setStep(1)
  }

  const isDone = step === DONE
  const title = isDone
    ? `You're booked, ${booking.name.trim().split(/\s+/)[0]}!`
    : STEPS[step - 1].title

  return (
    <section
      id="reserve"
      aria-labelledby="reserve-title"
      className="scroll-mt-20 border-t border-ash-dim/45 bg-void py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <h2
            id="reserve-title"
            className="display text-4xl uppercase text-cooled text-balance sm:text-5xl"
          >
            Reserve a table
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ash">
            Book online for up to {RESTAURANT.maxPartyOnline} guests. It takes about a minute.
          </p>
        </div>

        {/* grid-cols-1 = "minmax(0, 1fr)": lets the column shrink below its content.
            Without it, the wide date strip stretched this card to 1,700px on phones. */}
        <div
          className={`mt-10 grid grid-cols-1 items-start gap-6 ${isDone ? '' : 'lg:grid-cols-[minmax(0,1fr)_20rem]'}`}
        >
          <div className="lit-edge rounded-2xl border border-ash-dim/45 bg-uling p-5 sm:p-8">
            {!isDone && <StepIndicator steps={STEPS} current={step} />}

            <h3
              ref={headingRef}
              tabIndex={-1}
              className={`${isDone ? '' : 'mt-7'} scroll-mt-28 display-sm text-3xl text-balance focus:outline-none`}
            >
              {title}
            </h3>

            {/* Show only the current step. This is "conditional rendering".
                key={step} restarts the entrance animation on every move, so the
                change of step is explained rather than just swapped underneath you. */}
            <div key={step} className="anim-step mt-6">
              {step === 1 && (
                <StepSchedule
                  partySize={partySize}
                  onPartySizeChange={handlePartySizeChange}
                  dateKey={dateKey}
                  onDateChange={handleDateChange}
                  time={time}
                  onTimeChange={setTime}
                  onContinue={() => setStep(2)}
                />
              )}
              {step === 2 && (
                <StepDetails
                  details={details}
                  onChange={setDetails}
                  onBack={() => setStep(1)}
                  onContinue={() => setStep(3)}
                />
              )}
              {step === 3 && (
                <StepReview
                  partySize={partySize}
                  dateKey={dateKey}
                  time={time}
                  details={details}
                  onEdit={setStep}
                  onBack={() => setStep(2)}
                  onConfirm={handleConfirm}
                />
              )}
              {isDone && <Confirmation booking={booking} onStartOver={handleStartOver} />}
            </div>
          </div>

          {!isDone && <BookingSummary partySize={partySize} dateKey={dateKey} time={time} details={details} />}
        </div>
      </div>
    </section>
  )
}
