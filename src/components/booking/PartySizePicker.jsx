import { RESTAURANT } from '../../data/restaurant'
import Icon from '../ui/Icon'

// The "−  2 guests  +" control.
export default function PartySizePicker({ value, max, onChange }) {
  return (
    <div>
      <div className="inline-flex items-center gap-1 rounded-full border border-ash-dim bg-uling p-1.5 transition-colors duration-200 focus-within:border-ember">
        <StepperButton label="Remove a guest" icon="minus" onClick={() => onChange(value - 1)} disabled={value <= 1} />

        {/* <output> + aria-live: the new number is announced when it changes.
            key={value} replays a 160ms tick, so the count acknowledges the tap. */}
        <output aria-live="polite" className="min-w-28 text-center">
          <span
            key={value}
            className="anim-step inline-block display-sm text-2xl tabular-nums"
            style={{ animationDuration: '160ms' }}
          >
            {value}
          </span>{' '}
          <span className="text-sm text-ash">{value === 1 ? 'guest' : 'guests'}</span>
        </output>

        <StepperButton label="Add a guest" icon="plus" onClick={() => onChange(value + 1)} disabled={value >= max} />
      </div>

      {value >= max && (
        <p className="anim-step mt-3 text-sm text-ash">
          Bringing more than {max}? Email{' '}
          <a href={`mailto:${RESTAURANT.email}`} className="font-semibold text-ember underline">
            {RESTAURANT.email}
          </a>{' '}
          and we&rsquo;ll arrange a group booking.
        </p>
      )}
    </div>
  )
}

// h-11 w-11 = 44px: the minimum comfortable size for a finger to tap.
function StepperButton({ label, icon, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full text-cooled transition-[background-color,transform] duration-150 ease-heat hover:bg-uling-2 motion-safe:active:scale-90 disabled:cursor-not-allowed disabled:text-ash disabled:hover:bg-transparent disabled:active:scale-100"
      {...rest}
    >
      <Icon name={icon} className="h-5 w-5" />
    </button>
  )
}
