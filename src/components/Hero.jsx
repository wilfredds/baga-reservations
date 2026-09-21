import { RESTAURANT, SERVICES } from '../data/restaurant'
import { buttonStyles } from './ui/Button'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* A soft ember glow behind the headline. aria-hidden: it's decoration only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-ember-200/40 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.25fr_1fr] lg:py-28">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember-700">
            {RESTAURANT.tagline} · {RESTAURANT.city}
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[1.04] text-balance sm:text-6xl lg:text-7xl">
            Cooked slowly, over live coals.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
            Liempo, inasal and pusit grilled the way they&rsquo;re meant to be — over <em>baga</em>,
            the glowing embers that gave us our name.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#reserve" className={buttonStyles({ size: 'lg' })}>
              Reserve a table
            </a>
            <a href="#menu" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
              See what&rsquo;s on the grill
            </a>
          </div>
        </div>

        {/* The woven "banig" panel with our opening hours on top. */}
        <div className="banig relative flex aspect-[4/5] max-h-[30rem] items-end rounded-[2rem] p-5 shadow-xl shadow-ember-900/20 sm:p-7">
          <div className="w-full rounded-2xl bg-paper/95 p-5 shadow-lg backdrop-blur sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Open Tuesday to Sunday</p>
            <dl className="mt-3 divide-y divide-stone-200">
              {SERVICES.map((service) => (
                <div key={service.id} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="font-display text-xl">{service.label}</dt>
                  <dd className="text-sm font-medium text-stone-700">{service.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-stone-500">Closed Mondays — the grill needs a rest too.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
