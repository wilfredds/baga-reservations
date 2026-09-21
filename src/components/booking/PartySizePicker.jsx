import { RESTAURANT } from '../../data/restaurant'

// The "−  2 guests  +" control.
export default function PartySizePicker({ value, max, onChange }) {
  return (
    <div>
      <div className="inline-flex items-center gap-1 rounded-full border border-stone-300 bg-white p-1.5">
        <StepperButton label="Remove a guest" onClick={() => onChange(value - 1)} disabled={value <= 1}>
          −
        </StepperButton>

        {/* <output> + aria-live: the new number is announced when it changes. */}
        <output aria-live="polite" className="min-w-28 text-center">
          <span className="font-display text-2xl">{value}</span>{' '}
          <span className="text-sm text-stone-600">{value === 1 ? 'guest' : 'guests'}</span>
        </output>

        <StepperButton label="Add a guest" onClick={() => onChange(value + 1)} disabled={value >= max}>
          +
        </StepperButton>
      </div>

      {value >= max && (
        <p className="mt-3 text-sm text-stone-600">
          Bringing more than {max}? Email{' '}
          <a href={`mailto:${RESTAURANT.email}`} className="font-semibold text-ember-700 underline underline-offset-2">
            {RESTAURANT.email}
          </a>{' '}
          and we&rsquo;ll arrange a group booking.
        </p>
      )}
    </div>
  )
}

// h-11 w-11 = 44px: the minimum comfortable size for a finger to tap.
function StepperButton({ label, children, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full text-xl font-semibold text-charcoal hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-600 disabled:cursor-not-allowed disabled:text-stone-300 disabled:hover:bg-transparent"
      {...rest}
    >
      <span aria-hidden="true">{children}</span>
    </button>
  )
}
