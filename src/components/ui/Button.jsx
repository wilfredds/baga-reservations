// One place that decides how buttons look. Every button on the site uses this,
// so they all match — change the style here and it changes everywhere.

const VARIANTS = {
  primary:
    'bg-ember-600 text-white shadow-sm hover:bg-ember-700 disabled:bg-stone-300 disabled:text-stone-500 disabled:shadow-none',
  secondary:
    'bg-white text-charcoal ring-1 ring-inset ring-stone-300 hover:bg-stone-50 disabled:text-stone-400',
  ghost: 'text-ember-700 hover:bg-ember-50 disabled:text-stone-400',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

// Exported separately so links (<a>) can look exactly like buttons too.
export function buttonStyles({ variant = 'primary', size = 'md', className = '' } = {}) {
  return [
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-600',
    'disabled:cursor-not-allowed',
    VARIANTS[variant],
    SIZES[size],
    className,
  ].join(' ')
}

// type="button" by default. A plain <button> inside a <form> is secretly type="submit",
// which submits the form by accident. Setting it explicitly avoids that surprise.
export default function Button({ variant, size, className, type = 'button', ...rest }) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...rest} />
}
