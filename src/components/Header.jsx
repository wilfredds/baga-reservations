import { RESTAURANT } from '../data/restaurant'
import { buttonStyles } from './ui/Button'

export default function Header() {
  return (
    // Dark all the way down: the bar, the hero below it and the footer bookend
    // the charcoal of the page between them.
    <header className="sticky top-0 z-30 border-b border-ash-dim/45 bg-void/80 text-cooled backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" className="display text-2xl uppercase">
          {RESTAURANT.name}
          <span className="text-ember">.</span>
        </a>

        <nav aria-label="Main">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {/* hidden on phones, shown from the "sm" breakpoint (640px) up */}
            <li className="hidden sm:block">
              <a
                href="#menu"
                className="text-ash transition-colors duration-150 hover:text-cooled"
              >
                Menu
              </a>
            </li>
            <li className="hidden sm:block">
              <a
                href="#visit"
                className="text-ash transition-colors duration-150 hover:text-cooled"
              >
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
