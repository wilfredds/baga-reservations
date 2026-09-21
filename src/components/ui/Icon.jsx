// Our icon set, drawn by hand rather than borrowed from the emoji keyboard.
// Every glyph shares one grid (24), one stroke width (1.75) and round caps,
// so they read as a family wherever they land.

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const PATHS = {
  minus: <path d="M5 12h14" {...STROKE} />,
  plus: <path d="M12 5v14M5 12h14" {...STROKE} />,
  check: <path d="m4.5 12.5 5 5 10-11" {...STROKE} />,
  arrowRight: <path d="M4 12h15m-6-6 6 6-6 6" {...STROKE} />,
  arrowLeft: <path d="M20 12H5m6 6-6-6 6-6" {...STROKE} />,
  calendar: (
    <>
      <rect x="3.25" y="5.25" width="17.5" height="15.5" rx="3" {...STROKE} />
      <path d="M3.25 10h17.5M8 3v4.5M16 3v4.5" {...STROKE} />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.75" {...STROKE} />
      <path d="M12 7v5.25l3.25 2" {...STROKE} />
    </>
  ),
  spark: <path d="M12 3.5c.9 4.2 2.4 5.7 6.6 6.6-4.2.9-5.7 2.4-6.6 6.6-.9-4.2-2.4-5.7-6.6-6.6 4.2-.9 5.7-2.4 6.6-6.6Z" {...STROKE} />,
}

export default function Icon({ name, className = 'h-5 w-5', title }) {
  const glyph = PATHS[name]
  if (!glyph) return null

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {glyph}
    </svg>
  )
}
