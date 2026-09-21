import { RESTAURANT } from '../data/restaurant'
import { buttonStyles } from './ui/Button'

export default function Header() {
  return (
    // Dark all the way down: the bar, the hero below it and the footer bookend
    // the warm paper of the page between them.
    <header className="sticky top-0 z-30 border-b border-white/10 bg-soot/85 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" className="font-display text-2xl tracking-tight">
          {RESTAURANT.name}
          <span className="text-ember-400">.</span>
        </a>

        <nav aria-label="Main">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {/* hidden on phones, shown from the "sm" breakpoint (640px) up */}
            <li className="hidden sm:block">
              <a
                href="#menu"
                className="text-stone-300 transition-colors duration-150 hover:text-white"
              >
                Menu
              </a>
            </li>
            <li className="hidden sm:block">
              <a
                href="#visit"
                className="text-stone-300 transition-colors duration-150 hover:text-white"
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
