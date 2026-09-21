import { MENU_HIGHLIGHTS } from '../data/restaurant'
import { formatPeso } from '../lib/dates'

export default function MenuHighlights() {
  return (
    <section id="menu" className="scroll-mt-20 border-t border-stone-200 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember-700">From the grill</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">What we&rsquo;re known for</h2>
        </div>

        {/* .map() turns each menu item (data) into a card (UI). The key helps React track each card. */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {MENU_HIGHLIGHTS.map((dish) => (
            <li
              key={dish.name}
              className="flex flex-col justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-6"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl">{dish.name}</h3>
                  <p className="shrink-0 font-semibold text-ember-700">{formatPeso(dish.price)}</p>
                </div>
                <p className="mt-2 leading-relaxed text-stone-600">{dish.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
