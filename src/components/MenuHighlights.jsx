import { MENU_HIGHLIGHTS } from '../data/restaurant'
import { formatPeso } from '../lib/dates'

// A menu, set like a menu: name and price on one baseline joined by a leader,
// with the description underneath. Four identical boxes would have told you
// nothing about the food; this shape is the one the content actually has.
//
// One photograph rather than a thumbnail per dish. Four stock images matched to
// four specific Filipino dishes would have meant one weak picture in the set,
// and a weak picture cheapens the three good ones next to it.
export default function MenuHighlights() {
  return (
    <section id="menu" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <h2 className="display max-w-2xl text-4xl uppercase text-cooled text-balance sm:text-5xl">
              What we&rsquo;re known for
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ash">
              Four plates that come off the coals all night. The rest of the menu is on the table
              when you sit down.
            </p>

            <ul className="mt-10">
              {MENU_HIGHLIGHTS.map((dish) => (
                <li
                  key={dish.name}
                  className="group border-t border-ash-dim/45 py-6 transition-colors duration-200"
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

          <figure className="relative self-start overflow-hidden rounded-2xl lg:sticky lg:top-24">
            <img
              src="/img/menu.webp"
              alt="Chicken and pork belly turning over the coals, tongs lifting one piece clear of the smoke."
              width="1000"
              height="1300"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            {/* Lets the photograph sit in the page instead of on top of it. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-void/70 via-transparent to-void/20"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
