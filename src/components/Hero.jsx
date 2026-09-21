import { useEffect, useRef, useState } from 'react'
import { RESTAURANT, SERVICES } from '../data/restaurant'
import { buttonStyles } from './ui/Button'

// Fixed rather than random, so every visitor sees the same composition and the
// sparks never re-scatter on a re-render. dx/dy are how far each one drifts
// before it burns out.
const SPARKS = [
  { left: '7%', bottom: '4%', dx: '14px', dy: '-190px', dur: '6.5s', delay: '0s' },
  { left: '15%', bottom: '7%', dx: '-10px', dy: '-150px', dur: '5.2s', delay: '1.4s' },
  { left: '23%', bottom: '3%', dx: '20px', dy: '-230px', dur: '7.4s', delay: '2.6s' },
  { left: '31%', bottom: '9%', dx: '-16px', dy: '-170px', dur: '5.8s', delay: '0.7s' },
  { left: '39%', bottom: '5%', dx: '12px', dy: '-210px', dur: '6.9s', delay: '3.1s' },
  { left: '47%', bottom: '8%', dx: '-8px', dy: '-160px', dur: '5.4s', delay: '1.9s' },
  { left: '55%', bottom: '4%', dx: '18px', dy: '-240px', dur: '7.8s', delay: '0.3s' },
  { left: '63%', bottom: '10%', dx: '-14px', dy: '-145px', dur: '5.1s', delay: '2.2s' },
  { left: '71%', bottom: '6%', dx: '10px', dy: '-200px', dur: '6.6s', delay: '3.7s' },
  { left: '79%', bottom: '3%', dx: '-18px', dy: '-225px', dur: '7.1s', delay: '1.1s' },
  { left: '87%', bottom: '8%', dx: '16px', dy: '-165px', dur: '5.6s', delay: '2.9s' },
  { left: '94%', bottom: '5%', dx: '-12px', dy: '-195px', dur: '6.2s', delay: '4.2s' },
]

// The hero is the grill itself: a bed of heat that catches light on load, with
// sparks lifting off it. "Baga" means glowing embers, so the brand's own
// material does the work a stock photograph would otherwise be asked to do.
export default function Hero() {
  const sectionRef = useRef(null)
  const [lit, setLit] = useState(false)

  // A loop nobody can see is a loop nobody should pay for: the sparks stop when
  // the hero scrolls away, and when the tab goes to the background.
  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    let onScreen = false
    const apply = () => setLit(onScreen && !document.hidden)

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      apply()
    })
    observer.observe(element)
    document.addEventListener('visibilitychange', apply)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', apply)
    }
  }, [])

  return (
    <section
      id="top"
      ref={sectionRef}
      className={`relative isolate overflow-hidden bg-soot text-white ${lit ? 'sparks-on' : ''}`}
    >
      <div aria-hidden="true" className="ember-bed anim-recede absolute inset-0 -z-20" />
      <div aria-hidden="true" className="ember-glow anim-breathe absolute inset-0 -z-20" />
      <div aria-hidden="true" className="ember-grain anim-drift absolute inset-0 -z-10" />

      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        {SPARKS.map((spark) => (
          <span
            key={spark.left}
            className="spark"
            style={{
              left: spark.left,
              bottom: spark.bottom,
              '--dx': spark.dx,
              '--dy': spark.dy,
              '--dur': spark.dur,
              '--delay': spark.delay,
            }}
          />
        ))}
      </div>

      {/* Keeps the text legible where the fire burns brightest. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-soot/85 via-soot/40 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-32 pt-20 sm:pb-40 sm:pt-28 lg:pb-52 lg:pt-32">
        <h1 className="anim-spread max-w-4xl font-display text-[2.75rem] leading-[1.02] tracking-[-0.02em] text-balance sm:text-6xl lg:text-[4.5rem]">
          Cooked slowly, over live coals.
        </h1>

        <p
          className="anim-rise mt-7 max-w-xl text-lg leading-relaxed text-ember-100/90"
          style={{ animationDelay: '260ms' }}
        >
          Liempo, inasal and pusit grilled the way they&rsquo;re meant to be — over <em>baga</em>, the
          glowing embers that gave us our name.
        </p>

        <div className="anim-rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: '400ms' }}>
          <a href="#reserve" className={buttonStyles({ size: 'lg' })}>
            Reserve a table
          </a>
          <a href="#menu" className={buttonStyles({ variant: 'onDark', size: 'lg' })}>
            See what&rsquo;s on the grill
          </a>
        </div>

        {/* Opening hours as plain facts on a hairline rule — no card, no label above them. */}
        <dl
          className="anim-rise mt-14 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/15 pt-6 text-sm sm:mt-20"
          style={{ animationDelay: '540ms' }}
        >
          {SERVICES.map((service) => (
            <div key={service.id}>
              <dt className="font-display text-lg text-white">{service.label}</dt>
              <dd className="mt-0.5 tabular-nums text-ember-100/80">{service.hours}</dd>
            </div>
          ))}
          <div>
            <dt className="font-display text-lg text-white">Closed Mondays</dt>
            <dd className="mt-0.5 text-ember-100/80">The grill needs a rest too</dd>
          </div>
          <div>
            <dt className="font-display text-lg text-white">Find us</dt>
            <dd className="mt-0.5 text-ember-100/80">{RESTAURANT.city}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
