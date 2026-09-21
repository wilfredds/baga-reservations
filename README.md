# Baga — Table Reservations

A static restaurant booking website built with **React** and **Tailwind CSS**.
Baga is a fictional charcoal-grill restaurant; no real bookings are made.

**Live demo:** https://baga-reservations.vercel.app

---

## What it does

A guest books a table in three steps:

1. **Date & time** — choose party size, a date, and a time slot
2. **Your details** — name, mobile, email, occasion, special requests
3. **Review** — check everything, accept the holding policy, confirm

They then get a booking reference and can add the reservation to their calendar.

## The edge cases it handles

| Situation | What the guest sees |
|---|---|
| Past dates | Never shown — the date strip starts at today, so they can't be picked |
| Closed on Mondays | Monday chips are shown but disabled and labelled "Closed" |
| Party of 10 | "+" stops at 10, with an email link for larger groups |
| Slot too small for the party | Disabled, with "Only 4 seats left" |
| Slot fully booked | Disabled, with "Fully booked" |
| Slot starting within the hour | Disabled, with "Too late to book" |
| A whole day with no space | An empty state that offers the next day that has room |
| Chosen time stops fitting (party size changed) | The time is cleared automatically |
| Invalid form fields | Clear messages, `aria-invalid`, and focus jumps to the first problem |
| Double-clicking "Confirm" | Ignored while the booking is being confirmed |

## Tech

- **React 19** — components and state
- **Tailwind CSS 4** — styling, with brand tokens in `src/index.css`
- **shadcn/ui** — Select, Popover and Calendar (Radix + react-day-picker underneath)
- **lucide-react** — icons in the shadcn components
- **Vite** — dev server and production build
- No backend. Availability is simulated deterministically, so the same date and time always show the same result.

**shadcn/ui** covers the three controls where a hand-rolled version would have been worse than a well-tested one: the occasion **Select**, and the **Popover + Calendar** used to pick a date beyond the visible strip. Their tokens are remapped to Baga's palette in `src/index.css`, so they arrive in this brand rather than in shadcn's default neutral grey.

Everything with real product logic in it — the date strip, the time grid, the party-size stepper, the buttons — stays hand-written, because shadcn has no equivalent and these are where the interesting edge cases live.

## Run it locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

To build the production version:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── data/restaurant.js          # all restaurant settings in one place
├── lib/
│   ├── availability.js         # which slots are open, and why not
│   ├── dates.js                # date + time helpers (local-time safe)
│   ├── validation.js           # form rules and messages
│   └── booking.js              # reference codes, fake network delay, .ics file
├── components/
│   ├── ui/                     # Button and form fields, reused everywhere
│   ├── booking/                # the 3-step booking flow
│   ├── Header.jsx, Hero.jsx, MenuHighlights.jsx, Footer.jsx
└── App.jsx                     # puts the page together
```

## Key decisions

- **State lives in one place.** `BookingSection` owns every answer; the step components only display data and report changes back up.
- **Derived data isn't stored.** Time slots are calculated from the date and party size instead of being kept in state, so they can never go out of sync.
- **Errors are designed out where possible.** Past dates can't be chosen at all, rather than being validated after the fact.
- **Accessibility.** Real labels on every field, `aria-pressed` on toggle buttons, live announcements for changes, focus moved to each new step, and 44px touch targets.
- **Dates use local time.** `toISOString()` converts to UTC and can shift the date by a day in the Philippines (UTC+8), so date keys are built from local date parts instead.
- **The hero is drawn, not photographed.** *Baga* means glowing embers, so the hero is a bed of heat with sparks lifting off it — rendered in CSS. It carries the brand without waiting on a photo shoot, and a real photograph can replace it later without touching the layout.
- **One authored motion moment, not reveals everywhere.** The coals catching light on load is the only choreographed sequence. Everything else — the step connector filling, the guest count ticking, slots staggering in — exists to explain a state change. Every animation has a `prefers-reduced-motion` path that keeps the feedback and drops the movement.
- **The sparks stop when nobody is watching.** An `IntersectionObserver` plus a `visibilitychange` listener pause the loop when the hero scrolls away or the tab is backgrounded.

## Deploy

Push to GitHub, then import the repository at [vercel.com/new](https://vercel.com/new). Vercel detects Vite automatically — no settings needed.
