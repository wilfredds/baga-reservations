import Icon from '../ui/Icon'

// The "1 — 2 — 3" progress bar at the top of the booking card.
// The connector between two steps fills from left to right as you advance,
// so progress is something you watch happen rather than something you re-read.
export default function StepIndicator({ steps, current }) {
  return (
    <ol aria-label="Booking progress" className="flex items-center gap-2 text-sm">
      {steps.map((step, index) => {
        const status = step.number < current ? 'done' : step.number === current ? 'current' : 'upcoming'
        const isLast = index === steps.length - 1

        return (
          <li
            key={step.number}
            aria-current={status === 'current' ? 'step' : undefined}
            className={`flex items-center gap-2 ${isLast ? '' : 'flex-1'}`}
          >
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold transition-colors duration-300 ease-heat ${
                status === 'done'
                  ? 'bg-leaf-600 text-white'
                  : status === 'current'
                    ? 'motion-safe:anim-flare bg-ember text-void'
                    : 'bg-uling text-ash ring-1 ring-inset ring-ash-dim/60'
              }`}
            >
              {status === 'done' ? <Icon name="check" className="h-4 w-4" /> : step.number}
              {status === 'done' && <span className="sr-only">Step {step.number}, completed</span>}
            </span>

            {/* Labels are visually hidden on phones but still read out by screen readers. */}
            <span
              className={`sr-only font-medium transition-colors duration-300 sm:not-sr-only ${
                status === 'upcoming' ? 'text-ash' : 'text-cooled'
              }`}
            >
              {step.label}
            </span>

            {!isLast && (
              <span aria-hidden="true" className="relative h-px flex-1 overflow-hidden bg-uling-2">
                <span
                  className={`absolute inset-0 origin-left bg-leaf-600 transition-transform duration-500 ease-heat ${
                    step.number < current ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}
