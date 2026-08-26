import React, { useState, useEffect, useRef } from 'react';

// One focus treatment for the whole file, so keyboard users get the same ring everywhere.
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime';
import { Link } from 'react-router-dom';
import { Reveal, Parallax } from './motion';
import { ART, LINKS } from './content';

/**
 * The sections the old inzbc.org had and the rebuild had been missing: the event
 * highlights and gallery, the summit and mailing-list pair, the advertising route, the
 * contact block with real people on it, and the newsletter archive.
 *
 * Everything factual here came off the live site. Where the old site stated something this
 * one cannot verify — the next event, the member count — the gap is marked rather than
 * filled.
 */

/** INZBC's own event photography, from their Flickr account. Summit 2018 is what that
    archive holds; the captions say so rather than implying these are recent. */
const EVENT_PHOTOS = [
  { src: '/events/summit-group.jpg', alt: 'Delegates and speakers at the INZBC Summit 2018 in Auckland' },
  { src: '/events/summit-delegates.jpg', alt: 'Delegates at the INZBC Summit 2018 venue' },
  { src: '/events/summit-speakers.jpg', alt: 'Speakers at the INZBC Summit 2018' },
  { src: '/events/summit-conversation.jpg', alt: 'Attendees in conversation at the INZBC Summit 2018' },
];

/** A photo set that advances on its own and can be driven by hand.
 *
 *  Autoplay stops permanently the moment someone uses the dots: taking control back from a
 *  visitor who has just made a choice is the thing carousels get wrong most often. It also
 *  never autoplays under prefers-reduced-motion. */
function EventCarousel() {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (held) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % EVENT_PHOTOS.length), 4500);
    return () => clearInterval(timer.current);
  }, [held]);

  return (
    <div>
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-ink shadow-2xl">
        {EVENT_PHOTOS.map((p, i) => (
          <img
            key={p.src}
            src={p.src}
            alt={p.alt}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="-ml-3 flex">
          {/* The dot stays 10px because that is the right size to look at; the button
              around it is 44px, the smallest target a thumb can reliably hit. Two different
              requirements, so two different boxes rather than a compromise between them. */}
          {EVENT_PHOTOS.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => {
                setHeld(true);
                setIndex(i);
              }}
              aria-label={`Show photo ${i + 1} of ${EVENT_PHOTOS.length}`}
              aria-current={i === index}
              className={`group grid h-11 w-11 place-items-center rounded-full ${FOCUS}`}
            >
              <span
                className={`block h-2.5 w-2.5 rounded-full transition-colors ${
                  i === index ? 'bg-plum' : 'bg-ink/25 group-hover:bg-ink/40'
                }`}
              />
            </button>
          ))}
        </div>
        <p className="text-xs text-foreground/70">INZBC Summit 2018, Auckland</p>
      </div>
    </div>
  );
}

function Todo({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-sm bg-lime/25 px-1 text-inherit underline decoration-dashed underline-offset-4">
      {children}
    </mark>
  );
}

/* --- Make Connections ------------------------------------------------------------------ */

export function MakeConnections() {
  return (
    <section className="relative bg-white px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <Reveal>
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-plum">Make connections</p>
          <h2 className="font-heading text-3xl text-ink md:text-4xl">
            Highlights of INZBC events held in the past few years
          </h2>
          <p className="mt-5 text-foreground">
            INZBC holds regular industry events, calling upon specialists and ministers,
            representatives of NZTE, MFAT and others, for meaningful dialogues within the
            business community.
          </p>
          <p className="mt-4 font-medium text-ink">
            Be seen in the right place, at the right time and in the right company.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/events"
              className="rounded-full bg-lime px-6 py-3 text-sm font-medium text-navy transition-transform active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
            >
              Register
            </Link>
            <Link
              to="/events/past"
              className="rounded-full border border-ink/25 px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
            >
              Event reports
            </Link>
          </div>
          <p className="mt-6 text-sm text-foreground">
            View gallery:{' '}
            <a href={LINKS.facebookAlbums} target="_blank" rel="noopener noreferrer" className="text-plum underline rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime">
              Facebook albums
            </a>
            {' · '}
            <a href={LINKS.flickr} target="_blank" rel="noopener noreferrer" className="text-plum underline rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime">
              Flickr
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <EventCarousel />
        </Reveal>
      </div>
    </section>
  );
}

/* --- Advertise ------------------------------------------------------------------------- */

export function Advertise() {
  return (
    <section className="relative bg-white px-6 py-16">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-plum">
        <div className="flex flex-wrap items-center justify-between gap-8 px-8 py-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-lime">
              Want to advertise with us?
            </p>
            <h2 className="mt-2 font-heading text-2xl text-white md:text-3xl">
              Get seen in the right company
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <a
              href={`${LINKS.email}?subject=Advertising%20enquiry`}
              className="inline-block rounded-full bg-lime px-6 py-3 text-sm font-medium text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
            >
              Advertise with us
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --- Connect --------------------------------------------------------------------------- */

export function ConnectBlock() {
  return (
    <section className="relative bg-mist px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2">
        <Reveal>
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-plum">Connect with us</p>
          <h2 className="font-heading text-3xl text-ink md:text-4xl">Get in touch</h2>

          <dl className="mt-8 space-y-6 text-sm">
            <div>
              <dt className="font-semibold text-ink">Chief Executive</dt>
              <dd className="text-foreground">
                Sunil Kaushal
                <br />
                <a href={LINKS.email} className="text-plum underline rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime">
                  Secretariat@inzbc.org
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Postal address</dt>
              <dd className="text-foreground">
                PO Box 26061, Glen Eden, Auckland 0641, New Zealand
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-foreground">We prefer email contact.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="font-heading text-xl text-ink">Drop us a message</h3>
            <p className="mt-3 text-sm text-foreground">
              <Todo>
                [[Contact form — needs a Wix Form so submissions reach the Secretariat inbox.
                A form posting nowhere is worse than none, so this links to email until it
                exists.]]
              </Todo>
            </p>
            <a
              href={LINKS.email}
              className="mt-7 inline-block rounded-full bg-lime px-6 py-3 text-sm font-medium text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
            >
              Email the Secretariat
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --- Newsletter and archive ------------------------------------------------------------- */

export function NewsletterBand() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <Reveal>
          <h2 className="font-heading text-2xl text-white md:text-3xl">
            Subscribe to our newsletter
          </h2>
          <p className="mt-4 text-white/75">
            Trade news, FTA developments and event announcements, straight to your inbox.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={LINKS.subscribe}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-lime px-6 py-3 text-sm font-medium text-navy"
            >
              Subscribe
            </a>
            <Link
              to="/newsletters"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
            >
              View the archive
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Parallax speed={-0.12}>
            <img
              src={ART.newsletterMockup}
              alt="The INZBC newsletter shown on a laptop and a tablet"
              loading="lazy"
              className="w-full"
            />
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}

/* --- Partners, including the India row the rebuild had dropped -------------------------- */

export function Partners() {
  return (
    <section className="relative bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-center font-heading text-2xl text-ink md:text-3xl">
            Our partners and supporters
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <img
            src={ART.partnerStrip}
            alt="INZBC partners and supporters: BNZ and Zespri as strategic partners, Fonterra as partner, Slumberzone, the Auckland Institute of Studies and Trade Aid as associate partners, alongside government and industry stakeholders"
            loading="lazy"
            className="mt-10 w-full"
          />
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-8 text-center text-sm text-foreground">
            <Todo>
              [[India Industry Partners row — FICCI, CII, PHD Chamber and others appear on
              the old site as a separate strip. Supply the logo files and links.]]
            </Todo>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
