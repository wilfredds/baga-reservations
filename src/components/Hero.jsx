import { useEffect, useRef, useState } from 'react'
import { RESTAURANT, SERVICES } from '../data/restaurant'
import { buttonStyles } from './ui/Button'

// Fixed rather than random, so every visitor sees the same composition and the
// sparks never re-scatter on a re-render. dx/dy are how far each one drifts
// before it burns out.
const SPARKS = [
  { left: '7%', bottom: '14%', dx: '14px', dy: '-190px', dur: '6.5s', delay: '0s' },
  { left: '15%', bottom: '17%', dx: '-10px', dy: '-150px', dur: '5.2s', delay: '1.4s' },
  { left: '23%', bottom: '13%', dx: '20px', dy: '-230px', dur: '7.4s', delay: '2.6s' },
  { left: '31%', bottom: '19%', dx: '-16px', dy: '-170px', dur: '5.8s', delay: '0.7s' },
  { left: '39%', bottom: '15%', dx: '12px', dy: '-210px', dur: '6.9s', delay: '3.1s' },
  { left: '47%', bottom: '18%', dx: '-8px', dy: '-160px', dur: '5.4s', delay: '1.9s' },
  { left: '55%', bottom: '14%', dx: '18px', dy: '-240px', dur: '7.8s', delay: '0.3s' },
  { left: '63%', bottom: '20%', dx: '-14px', dy: '-145px', dur: '5.1s', delay: '2.2s' },
  { left: '71%', bottom: '16%', dx: '10px', dy: '-200px', dur: '6.6s', delay: '3.7s' },
  { left: '79%', bottom: '13%', dx: '-18px', dy: '-225px', dur: '7.1s', delay: '1.1s' },
  { left: '87%', bottom: '18%', dx: '16px', dy: '-165px', dur: '5.6s', delay: '2.9s' },
  { left: '94%', bottom: '15%', dx: '-12px', dy: '-195px', dur: '6.2s', delay: '4.2s' },
]

// The hero is the grill. "Baga" means glowing embers, so the brand's own
// material does the work a stock photograph would otherwise be asked to do,
// and the headline is set in the same face as everything else — just pushed
// wide and heavy until it reads like stencilling on grill equipment.
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
      className={`relative isolate overflow-hidden bg-void ${lit ? 'sparks-on' : ''}`}
    >
      {/* The photograph carries the fire now, so the CSS ember bed is gone from here.
          The breathing glow and the sparks stay: they're what makes it a live grill
          rather than a picture of one. alt="" because the headline already says this. */}
      <img
        src="/img/hero.webp"
        alt=""
        aria-hidden="true"
        width="1800"
        height="1150"
        fetchPriority="high"
        decoding="async"
        className="anim-recede absolute inset-0 -z-30 h-full w-full object-cover object-center"
      />
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

      {/* Two scrims, not one: the vertical keeps the headline off the smoke, the
          horizontal keeps the left column dark while the food stays visible right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-void/95 via-void/70 via-[70%] to-void/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-void/90 via-void/50 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-48 pt-20 sm:pb-48 sm:pt-28 lg:pb-56 lg:pt-32">
        <h1 className="anim-spread display max-w-5xl text-[2.6rem] uppercase text-cooled text-balance sm:text-[4rem] lg:text-[5.75rem]">
          Cooked slowly, over live coals
        </h1>

        <p
          className="anim-rise mt-8 max-w-lg text-lg leading-relaxed text-ash"
          style={{ animationDelay: '260ms' }}
        >
          Liempo, inasal and pusit grilled the way they&rsquo;re meant to be — over <em>baga</em>, the
          glowing embers that gave us our name.
        </p>

        <div className="anim-rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: '400ms' }}>
          <a href="#reserve" className={buttonStyles({ size: 'lg' })}>
            Reserve a table
          </a>
          <a href="#menu" className={buttonStyles({ variant: 'onDark', size: 'lg' })}>
            See what&rsquo;s on the grill
          </a>
        </div>

        {/* Opening hours as plain facts on a hairline rule — no card, no label above them. */}
        <dl
          className="anim-rise mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-ash-dim/60 pt-7 text-sm sm:mt-24"
          style={{ animationDelay: '540ms' }}
        >
          {SERVICES.map((service) => (
            <div key={service.id}>
              <dt className="display-sm text-lg text-cooled">{service.label}</dt>
              <dd className="mt-1 tabular-nums text-ash">{service.hours}</dd>
            </div>
          ))}
          <div>
            <dt className="display-sm text-lg text-cooled">Closed Mondays</dt>
            <dd className="mt-1 text-ash">The grill needs a rest too</dd>
          </div>
          <div>
            <dt className="display-sm text-lg text-cooled">Find us</dt>
            <dd className="mt-1 text-ash">{RESTAURANT.city}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
