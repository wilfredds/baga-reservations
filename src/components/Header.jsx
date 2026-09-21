import { RESTAURANT } from '../data/restaurant'
import { buttonStyles } from './ui/Button'

export default function Header() {
  return (
    // sticky + backdrop-blur: the header stays at the top and blurs what scrolls under it.
    <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" className="font-display text-2xl tracking-tight">
          {RESTAURANT.name}
          <span className="text-ember-600">.</span>
        </a>

        <nav aria-label="Main">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {/* hidden on phones, shown from the "sm" breakpoint (640px) up */}
            <li className="hidden sm:block">
              <a href="#menu" className="text-stone-600 hover:text-charcoal">
                Menu
              </a>
            </li>
            <li className="hidden sm:block">
              <a href="#visit" className="text-stone-600 hover:text-charcoal">
                Visit
              </a>
            </li>
            <li>
              <a href="#reserve" className={buttonStyles({ size: 'sm' })}>
                Reserve
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
