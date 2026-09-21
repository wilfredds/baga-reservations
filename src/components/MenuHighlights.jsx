import { MENU_HIGHLIGHTS } from '../data/restaurant'
import { formatPeso } from '../lib/dates'

// A menu, set like a menu: name and price on one baseline joined by a leader,
// with the description underneath. Four identical boxes would have told you
// nothing about the food; this shape is the one the content actually has.
export default function MenuHighlights() {
  return (
    <section id="menu" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="display max-w-2xl text-4xl uppercase text-cooled text-balance sm:text-5xl">
          What we&rsquo;re known for
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ash">
          Four plates that come off the coals all night. The rest of the menu is on the table when
          you sit down.
        </p>

        <ul className="mt-12 grid gap-x-14 sm:grid-cols-2">
          {MENU_HIGHLIGHTS.map((dish) => (
            <li
              key={dish.name}
              className="group border-t border-ash-dim/45 py-7 transition-colors duration-200 first:border-t-0 sm:first:border-t sm:[&:nth-child(2)]:border-t-0"
            >
              <div className="flex items-baseline gap-3">
                <h3 className="display-sm text-2xl text-cooled transition-colors duration-200 group-hover:text-whitehot">
                  {dish.name}
                </h3>
                {/* The leader: a hairline that grows to fill whatever space is left. */}
                <span
                  aria-hidden="true"
                  className="h-px min-w-6 flex-1 translate-y-[-0.3em] bg-ash-dim transition-colors duration-200 group-hover:bg-ember"
                />
                <p className="shrink-0 display-sm text-2xl tabular-nums text-ember">
                  {formatPeso(dish.price)}
                </p>
              </div>
              <p className="mt-2 max-w-md leading-relaxed text-ash">{dish.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
