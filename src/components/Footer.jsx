import { RESTAURANT, SERVICES } from '../data/restaurant'

export default function Footer() {
  return (
    <footer id="visit" className="scroll-mt-20 bg-charcoal text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-3">
        <div>
          <p className="font-display text-3xl text-white">
            {RESTAURANT.name}
            <span className="text-ember-500">.</span>
          </p>
          <p className="mt-2 text-sm">{RESTAURANT.tagline}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Hours</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {SERVICES.map((service) => (
              <li key={service.id}>
                {service.label}: {service.hours}
              </li>
            ))}
            <li>Closed Mondays</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Find us</h2>
          <p className="mt-3 text-sm">{RESTAURANT.city}</p>
          <a href={`mailto:${RESTAURANT.email}`} className="mt-1 inline-block text-sm text-ember-200 hover:text-white">
            {RESTAURANT.email}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-stone-400">
          Baga is a fictional restaurant — this is a front-end demo, and no real bookings are made.
          Built with React and Tailwind CSS by Francis Wilfred Antiporda.
        </p>
      </div>
    </footer>
  )
}
