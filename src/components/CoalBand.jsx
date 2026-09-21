// A band of live fire between the menu and the booking form. It is not
// decoration: it carries the one line that explains what this kitchen is,
// and it gives the page somewhere to breathe between reading and doing.
export default function CoalBand() {
  return (
    <section aria-label="About the grill" className="relative isolate overflow-hidden">
      <img
        src="/img/coals.webp"
        alt=""
        aria-hidden="true"
        width="1920"
        height="700"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      {/* Fades into the black page at both edges so the band reads as light in the
          room, but stays light enough in the middle for the fire to actually show.
          The second scrim darkens only the left, where the line of copy sits. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-void via-void/10 to-void"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-void/85 via-void/35 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <p className="display-sm max-w-2xl text-2xl leading-snug text-cooled text-balance sm:text-3xl">
          Everything here meets fire before it meets a plate.
        </p>
      </div>
    </section>
  )
}
