// One place that decides how buttons look. Every button on the site uses this,
// so they all match — change the style here and it changes everywhere.
// Kept hand-written on purpose: shadcn's button brings cva + Slot for variants
// we already express in four lines, and its defaults don't match this palette.

const VARIANTS = {
  primary: [
    'bg-ember-600 text-white shadow-[0_1px_2px_rgb(92_31_8_/_0.35)]',
    'hover:bg-ember-500 hover:shadow-[0_6px_18px_-6px_rgb(194_65_12_/_0.65)]',
    'disabled:bg-stone-300 disabled:text-stone-600 disabled:shadow-none',
  ].join(' '),
  secondary: [
    'bg-white text-charcoal ring-1 ring-inset ring-stone-300',
    'hover:bg-stone-50 hover:ring-ember-300',
    'disabled:text-stone-500 disabled:hover:bg-white',
  ].join(' '),
  // For the dark, ember-lit hero: readable without punching a white hole in the coals.
  onDark: [
    'bg-white/10 text-white ring-1 ring-inset ring-white/30 backdrop-blur-sm',
    'hover:bg-white/20 hover:ring-white/50',
    'disabled:text-white/50',
  ].join(' '),
  ghost: 'text-ember-700 hover:bg-ember-50 disabled:text-stone-500',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
  icon: 'h-9 w-9 p-0',
}

// Exported separately so links (<a>) can look exactly like buttons too.
export function buttonStyles({ variant = 'primary', size = 'md', className = '' } = {}) {
  return [
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold',
    // 150ms is immediate feedback; the press is a real 1px, so the control feels physical.
    'transition-[background-color,box-shadow,transform,color] duration-150 ease-heat',
    'motion-safe:active:translate-y-px',
    'disabled:cursor-not-allowed disabled:active:translate-y-0',
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

/* ------------------------------------------------------------------
   shadcn/ui compatibility
   shadcn's Calendar imports `Button` and `buttonVariants` and calls them
   with its own vocabulary ("ghost", "outline", size "icon"). Translating
   that vocabulary here means the calendar's controls come out in Baga's
   button styles instead of dragging a second button system into the app.
   ------------------------------------------------------------------ */
const SHADCN_VARIANT = {
  default: 'primary',
  destructive: 'primary',
  outline: 'secondary',
  secondary: 'secondary',
  ghost: 'ghost',
  link: 'ghost',
}

const SHADCN_SIZE = { default: 'md', sm: 'sm', lg: 'lg', icon: 'icon' }

export function buttonVariants({ variant = 'default', size = 'default', className = '' } = {}) {
  return buttonStyles({
    variant: SHADCN_VARIANT[variant] ?? 'primary',
    size: SHADCN_SIZE[size] ?? 'md',
    className,
  })
}

export { Button }
