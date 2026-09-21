// One place that decides how buttons look. Every button on the site uses this,
// so they all match — change the style here and it changes everywhere.
// Kept hand-written on purpose: shadcn's button brings cva + Slot for variants
// we already express in four lines, and its defaults don't match this palette.

const VARIANTS = {
  // Black on ember, not white. White on this orange is 3.8:1 and fails;
  // black is 5.6:1, and it reads like the stencilled type on grill equipment.
  primary: [
    'bg-ember text-void',
    'hover:bg-whitehot hover:shadow-[0_6px_20px_-6px_rgb(226_86_26_/_0.8)]',
    'disabled:bg-uling-2 disabled:text-ash disabled:shadow-none',
  ].join(' '),
  secondary: [
    'bg-uling-2 text-cooled ring-1 ring-inset ring-ash-dim',
    'hover:bg-uling-2 hover:ring-ember hover:text-whitehot',
    'disabled:text-ash-dim disabled:hover:ring-ash-dim',
  ].join(' '),
  // An outline that sits on the coals without punching a hole in them.
  onDark: [
    'bg-transparent text-cooled ring-1 ring-inset ring-ash',
    'hover:text-void hover:bg-cooled hover:ring-cooled',
    'disabled:text-ash-dim',
  ].join(' '),
  ghost: 'text-ember hover:bg-uling-2 hover:text-whitehot disabled:text-ash-dim',
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
    // Square-ish, not pill: this world is stencilled and industrial, not soft.
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold',
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
