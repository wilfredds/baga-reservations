// The "1 — 2 — 3" progress bar at the top of the booking card.
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
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold ${
                status === 'done'
                  ? 'bg-leaf-600 text-white'
                  : status === 'current'
                    ? 'bg-ember-600 text-white'
                    : 'bg-stone-200 text-stone-500'
              }`}
            >
              {status === 'done' ? <span aria-hidden="true">✓</span> : step.number}
              {status === 'done' && <span className="sr-only">Step {step.number}, completed</span>}
            </span>

            {/* Labels are visually hidden on phones but still read out by screen readers. */}
            <span
              className={`sr-only font-medium sm:not-sr-only ${
                status === 'upcoming' ? 'text-stone-400' : 'text-charcoal'
              }`}
            >
              {step.label}
            </span>

            {!isLast && <span aria-hidden="true" className="h-px flex-1 bg-stone-300" />}
          </li>
        )
      })}
    </ol>
  )
}
