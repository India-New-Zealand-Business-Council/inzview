import React, { useRef } from 'react';
import { motion, useTransform, useReducedMotion } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import TradeRoute from '@/components/inzbc/TradeRoute';
import PinnedJourney from '@/components/inzbc/PinnedJourney';
import {
  Reveal,
  WordReveal,
  Parallax,
  TiltCard,
  ScrollProgress,
  StickyHeader,
  useHeroProgress,
} from '@/components/inzbc/motion';
import { LINKS, ART, PATHWAYS, BENEFITS, SOCIALS } from '@/components/inzbc/content';

/**
 * INZBC homepage.
 *
 * Bands alternate surface — dark, mist, white — so no two adjacent sections share one, and
 * each carries a soft gradient edge rather than a hard horizontal rule. The trade route runs
 * behind all of it as the page's one persistent object.
 *
 * Placeholders render visibly on purpose. Every [[...]] is a fact INZBC still owes and a
 * visible gap is more honest than an invented number.
 */

/* --- small shared pieces ------------------------------------------------------------- */

/** A fact INZBC has not supplied yet. Deliberately visible. */
function Todo({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-sm bg-lime/25 px-1 text-inherit underline decoration-dashed underline-offset-4">
      {children}
    </mark>
  );
}

function Btn({
  href,
  children,
  variant = 'primary',
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  external?: boolean;
}) {
  const base =
    'inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime';
  const skin =
    variant === 'primary'
      ? 'bg-lime text-navy hover:brightness-105'
      : 'border border-white/30 text-white hover:bg-white/10';
  // Internal destinations go through the router; anything off-site opens in a new tab.
  if (!external && href.startsWith('/')) {
    return (
      <Link to={href} className={`${base} ${skin}`}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={`${base} ${skin}`} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/** Soft edge between bands, in the colour of the band it introduces. */
function Fade({ to }: { to: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-16 h-16"
      style={{ background: `linear-gradient(to bottom, transparent, ${to})` }}
    />
  );
}

/* --- hero ---------------------------------------------------------------------------- */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const scrollYProgress = useHeroProgress(ref);

  // Three depth tiers. The background moves least against the scroll and so reads furthest
  // away; the copy sits in front and barely moves at all.
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '26%']);
  const midY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const s = (v: MotionValue<string>) => (reduced ? undefined : v);

  return (
    <section ref={ref} className="relative flex min-h-[92vh] items-center overflow-hidden bg-deep">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${ART.heroPhoto})`, y: s(bgY), opacity: 0.42 }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-1/4 top-0 -z-10 h-[46rem] w-[46rem] rounded-full opacity-50 blur-3xl"
        style={{
          background: 'radial-gradient(closest-side, rgba(97,20,95,0.95), transparent)',
          y: s(midY),
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(90deg, #0e0522 0%, rgba(14,5,34,0.86) 46%, rgba(14,5,34,0.45) 100%)',
        }}
      />

      <motion.div className="mx-auto w-full max-w-6xl px-6 py-24" style={{ y: s(copyY) }}>
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-lime">
            India &ndash; New Zealand trade since 1988
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="max-w-4xl font-heading text-5xl leading-[1.05] text-white md:text-7xl">
            <WordReveal text="New Zealand's gateway to the India opportunity" delay={0.15} />
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-lg text-white/75">
            The India New Zealand Business Council connects exporters, investors and
            institutions across the NZ&ndash;India trade relationship &mdash; and leads the way
            through the new NZ&ndash;India Free Trade Agreement.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Btn href="/fta">Explore the FTA</Btn>
            <Btn href={LINKS.join} variant="ghost" external>
              Join INZBC
            </Btn>
          </div>
        </Reveal>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.3em] text-white/40"
        style={{ opacity: reduced ? 1 : fade }}
      >
        Scroll
      </motion.div>
    </section>
  );
}

/* --- page ---------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <div className="relative bg-white font-paragraph text-foreground">
      <ScrollProgress />
      <StickyHeader
        logo={ART.logo}
        links={[
          { label: 'The FTA', href: '/fta' },
          { label: 'Events', href: '/events' },
          { label: 'Membership', href: '/membership' },
          { label: 'Publications', href: '/publications' },
          { label: 'Connect', href: '/connect' },
        ]}
        cta={{ label: 'Join', href: LINKS.join }}
      />
      <TradeRoute />

      <main className="relative z-10">
        <Hero />

        {/* Credibility strip */}
        <section className="relative bg-navy px-6 py-6 text-center text-sm text-white/80">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <span>Established 1988</span>
            <span aria-hidden="true" className="text-white/25">
              &middot;
            </span>
            <span>
              <Todo>[[member count &mdash; confirm with INZBC]]</Todo>
            </span>
            <span aria-hidden="true" className="text-white/25">
              &middot;
            </span>
            <span>Recognised by the governments of New Zealand and India</span>
          </div>
        </section>

        {/* Why INZBC */}
        <section className="relative bg-mist px-6 py-24">
          <Fade to="#f4f2f8" />
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-center font-heading text-4xl text-ink md:text-5xl">
                Why INZBC?
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <Reveal>
                <p className="text-lg text-foreground">
                  New Zealand&rsquo;s leading India trade and FTA platform, connecting
                  businesses, government and investors since 1988.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-lg text-foreground">
                  With the NZ&ndash;India Free Trade Agreement signed, members gain first-mover
                  advantage through trade intelligence, policy access and business networks.
                </p>
              </Reveal>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                'Advocate on trade policy and market access',
                'Share market intelligence and FTA insights',
                'Connect businesses across both countries',
              ].map((claim, i) => (
                <Reveal key={claim} delay={i * 0.08}>
                  <p className="border-t-2 border-lime pt-4 font-medium text-ink">{claim}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* ABOUT SECTION */}
        <section id="about" ref={aboutRef} className="w-full py-32 lg:py-48 px-6 lg:px-12 bg-background">
          <div className="max-w-[120rem] mx-auto relative">
            <div className="w-full lg:w-4/5 h-[60vh] lg:h-[90vh] overflow-hidden">
              <motion.div style={{ y: aboutImageY }} className="w-full h-[120%] -mt-[10%]">
                <Image
                  src="https://static.wixstatic.com/media/df219d_c9e9a55db4ac4f69b7420c2b131d8071~mv2.png?originWidth=1600&originHeight=896"
                  alt="INZBC grooming experience"
                  width={1600}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: transitionEase }}
              className="lg:absolute bottom-0 right-0 lg:-mb-24 lg:w-[55%] bg-buttonbackground p-10 lg:p-24 border border-primary/10 shadow-2xl"
            >
              <h2 className="font-heading text-5xl lg:text-7xl text-primary mb-10 leading-none">
                The INZBC<br/>Experience
              </h2>
              <div className="space-y-8">
                <p className="font-paragraph text-xl text-primary leading-relaxed">
                  At INZBC, we believe grooming is an art form. Our master stylists combine decades of experience with contemporary techniques to deliver exceptional results.
                </p>
                <p className="font-paragraph text-xl text-primary leading-relaxed">
                  Every visit is crafted to provide not just a service, but a transformative experience in an atmosphere of refined elegance.
                </p>
                <div className="pt-8">
                  <button className="font-paragraph text-sm uppercase tracking-[0.2em] px-10 py-5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-500">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="w-full py-32 lg:py-48 px-6 lg:px-12 bg-secondary text-secondary-foreground mt-24 lg:mt-48">
          <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            <div className="lg:col-span-5 flex flex-col justify-between">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: transitionEase }}
              >
                <h2 className="font-heading text-6xl lg:text-8xl mb-16 leading-none">
                  Visit Us
                </h2>

                <div className="space-y-12 font-paragraph text-lg text-secondary-foreground/80">
                  <div>
                    <p className="font-heading text-2xl text-secondary-foreground mb-4">Location</p>
                    {contactInfo.location.map((line, i) => <p key={i}>{line}</p>)}
                  </div>
                  <div>
                    <p className="font-heading text-2xl text-secondary-foreground mb-4">Hours</p>
                    {contactInfo.hours.map((line, i) => <p key={i}>{line}</p>)}
                  </div>
                  <div>
                    <p className="font-heading text-2xl text-secondary-foreground mb-4">Contact</p>
                    {contactInfo.contact.map((line, i) => <p key={i}>{line}</p>)}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: transitionEase }}
                className="bg-background p-10 lg:p-20 text-primary"
              >
                <h3 className="font-heading text-4xl lg:text-5xl mb-12">
                  Book Your Appointment
                </h3>
                <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      className="peer w-full bg-transparent border-b border-primary/30 py-4 font-paragraph text-lg text-primary placeholder-transparent focus:outline-none focus:border-primary transition-colors"
                      placeholder="Name"
                    />
                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-sm font-paragraph text-primary/60 transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-primary">
                      Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      className="peer w-full bg-transparent border-b border-primary/30 py-4 font-paragraph text-lg text-primary placeholder-transparent focus:outline-none focus:border-primary transition-colors"
                      placeholder="Email"
                    />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-sm font-paragraph text-primary/60 transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-primary">
                      Email
                    </label>
                  </div>

                  <div className="relative pt-4">
                    <label className="font-paragraph text-sm text-primary/60 block mb-2">
                      Service
                    </label>
                    <select className="w-full bg-transparent border-b border-primary/30 py-4 font-paragraph text-lg text-primary focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                      {servicesData.map((service, i) => (
                        <option key={i} value={service.title}>{service.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-8">
                    <button
                      type="submit"
                      className="w-full font-paragraph text-sm uppercase tracking-[0.2em] px-10 py-6 border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-500"
                    >
                      Request Appointment
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
=======
        {/* Pathways */}
        <section className="relative bg-white px-6 py-24">
          <Fade to="#ffffff" />
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-center font-heading text-4xl text-ink md:text-5xl">
                Where would you like to start?
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PATHWAYS.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.07}>
                  <TiltCard
                    href={p.href}
                    className="group block h-full rounded-2xl bg-mist p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
                  >
                    <img
                      src={p.icon}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="mb-5 h-24 w-auto"
                    />
                    <h3 className="font-heading text-xl text-ink">{p.title}</h3>
                    <p className="mt-2 text-sm text-foreground">{p.body}</p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FTA band */}
        <section className="relative overflow-hidden bg-navy px-6 py-24">
          <Fade to="#160933" />
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8">
            <Reveal className="max-w-2xl">
              <h2 className="font-heading text-4xl text-white md:text-5xl">
                The NZ&ndash;India FTA changes what&rsquo;s possible
              </h2>
              <p className="mt-4 text-white/70">
                <Todo>
                  [[FTA summary copy &mdash; pull from the FTA Overview page once drafted.]]
                </Todo>
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <Btn href="/fta">Understand the FTA</Btn>
            </Reveal>
          </div>
        </section>

        {/* The pinned journey — the section Studio could not build */}
        <PinnedJourney />

        {/* Summit */}
        <section className="relative overflow-hidden bg-navy px-6 py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
            <Reveal>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-lime">
                INZBC Annual Summit
              </p>
              <h2 className="font-heading text-4xl text-white md:text-5xl">
                New Zealand&rsquo;s premier India trade event
              </h2>
              <p className="mt-4 text-white/70">
                Bringing together business leaders, policymakers and government
                representatives from both countries.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn href="/events">See upcoming events</Btn>
                <Btn href={LINKS.summitSite} variant="ghost" external>
                  Summit website
                </Btn>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <Parallax speed={-0.1}>
                <img
                  src={ART.magazineSpread}
                  alt="Spread from the INZBC report showing photography and articles from the annual summit"
                  loading="lazy"
                  className="w-full rounded-xl shadow-2xl"
                />
              </Parallax>
            </Reveal>
          </div>
        </section>

        {/* Membership */}
        <section className="relative overflow-hidden bg-ink px-6 py-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: `url(${ART.heroPhoto})` }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, #1a0b3f 0%, rgba(26,11,63,0.86) 46%, rgba(26,11,63,0.5) 100%)',
            }}
          />
          <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
            <Reveal>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-lime">The network</p>
              <h2 className="font-heading text-4xl text-white md:text-5xl">
                Who you meet by joining
              </h2>
              <p className="mt-4 text-white/70">
                Exporters, importers, investors, universities and government agencies on both
                sides of the corridor.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn href="/membership/directory">Explore the directory</Btn>
                <Btn href={LINKS.join} variant="ghost" external>
                  Become a member
                </Btn>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <ul className="space-y-5">
                {BENEFITS.map(([lead, rest]) => (
                  <li key={lead} className="border-l-2 border-lime pl-4 text-white/80">
                    <strong className="font-semibold text-white">{lead}</strong> {rest}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Insights */}
        <section className="relative bg-mist px-6 py-24">
          <Fade to="#f4f2f8" />
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-center font-heading text-4xl text-ink md:text-5xl">
                Latest insights
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                {
                  img: ART.ftaFlyer,
                  alt: 'Event flyer for Inside the NZ India FTA with Vangelis Vitalis',
                  title: 'Inside the NZ–India FTA with Vangelis Vitalis',
                  body: "An Auckland event with New Zealand's chief trade negotiator.",
                },
                {
                  img: ART.ftaNewEra,
                  alt: 'Delegation photograph accompanying the FTA article',
                  title: 'A new era for business',
                  body: 'The agreement signals a new era for trade between the two countries.',
                },
                {
                  img: ART.heroBanner,
                  alt: 'INZBC banner showing a container port and India Gate',
                  title: 'INZBC welcomes the landmark agreement',
                  body: null,
                },
              ].map((post, i) => (
                <Reveal key={post.title} delay={i * 0.08}>
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
                    <img
                      src={post.img}
                      alt={post.alt}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover"
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-heading text-lg text-ink">{post.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-foreground">
                        {post.body ?? (
                          <Todo>[[Article summary &mdash; confirm with INZBC.]]</Todo>
                        )}
                      </p>
                      <a href="/news" className="mt-4 text-sm font-medium text-plum underline">
                        Read more
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="relative overflow-hidden bg-ink px-6 py-24">
          <Fade to="#1a0b3f" />
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-lime">
                Voice of the industry
              </p>
              <h2 className="font-heading text-4xl text-white md:text-5xl">
                What INZBC publishes
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-12 md:grid-cols-2">
              {[
                {
                  cover: ART.reportCover,
                  alt: 'Cover of Grow With India, the New Zealand India Trade Report 2025',
                  title: 'Grow With India',
                  sub: 'The New Zealand India Trade Report 2025',
                  body: 'Where the trade relationship stands and where it can go.',
                  href: LINKS.reportIssuu,
                  lift: 'md:-translate-y-3',
                },
                {
                  cover: ART.kiaOraCover,
                  alt: 'Cover of Kia Ora India, the INZBC magazine',
                  title: 'Kia Ora India',
                  sub: 'The INZBC magazine',
                  body: 'Member businesses and the people moving between the two markets.',
                  href: LINKS.kiaOraIssuu,
                  lift: 'md:translate-y-6',
                },
              ].map((pub, i) => (
                <Reveal key={pub.title} delay={i * 0.12}>
                  <article className={`flex gap-6 ${pub.lift}`}>
                    <Parallax speed={i === 0 ? -0.12 : -0.22} className="flex-none">
                      <img
                        src={pub.cover}
                        alt={pub.alt}
                        loading="lazy"
                        className="h-auto w-32 rounded-lg shadow-2xl md:w-40"
                      />
                    </Parallax>
                    <div>
                      <h3 className="font-heading text-2xl text-white">{pub.title}</h3>
                      <p className="mt-1 text-sm text-lime">{pub.sub}</p>
                      <p className="mt-3 text-sm text-white/70">{pub.body}</p>
                      <a
                        href={pub.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-block rounded-full bg-lime px-5 py-2 text-sm font-medium text-navy"
                      >
                        Read it
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mt-16 border-t border-white/10 pt-6 text-sm text-white/60">
              Kia Ora India carries advertising.{' '}
              <a
                href={`${LINKS.email}?subject=Advertising%20enquiry`}
                className="text-lime underline"
              >
                Enquire about advertising
              </a>
            </p>
          </div>
        </section>

        {/* Newsletter */}
        <section className="relative bg-plum px-6 py-20">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8">
            <Reveal>
              <h2 className="font-heading text-3xl text-white md:text-4xl">
                Subscribe to the INZBC newsletter
              </h2>
              <p className="mt-3 max-w-lg text-white/80">
                Trade news, FTA developments and event announcements, straight to your inbox.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Btn href={LINKS.subscribe} external>
                Subscribe
              </Btn>
            </Reveal>
          </div>
        </section>

        {/* Social */}
        <section className="relative bg-navy px-6 py-20 text-center">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="font-heading text-3xl text-white md:text-4xl">
                Follow the trade relationship
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
              {SOCIALS.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.06}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 text-sm text-white/80 hover:text-white"
                  >
                    <img
                      src={s.icon}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="w-28 transition-transform duration-300 group-hover:-translate-y-1.5"
                    />
                    <span>{s.label}</span>
                  </a>
                </Reveal>
              ))}
            </div>
            <p className="mt-10 text-sm text-white/60">
              <a href={LINKS.facebookAlbums} target="_blank" rel="noopener noreferrer" className="underline">
                Event albums
              </a>
              {' · '}
              <a href={LINKS.flickr} target="_blank" rel="noopener noreferrer" className="underline">
                Photo galleries on Flickr
              </a>
            </p>
          </div>
        </section>

        {/* Partners */}
        <section className="relative bg-white px-6 py-20">
          <Fade to="#ffffff" />
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <img
                src={ART.partnerStrip}
                alt="INZBC partners and supporters, including BNZ, Zespri and Fonterra, alongside government and industry stakeholders"
                loading="lazy"
                className="w-full"
              />
            </Reveal>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative bg-deep px-6 py-28 text-center">
          <Fade to="#0e0522" />
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-heading text-4xl text-white md:text-5xl">
                Ready to grow your business with India?
              </h2>
              <p className="mt-4 text-white/70">
                Join INZBC, or talk to us about how we can help your organisation engage across
                the corridor.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Btn href={LINKS.join} external>
                  Join INZBC
                </Btn>
                <Btn href="/connect" variant="ghost">
                  Contact us
                </Btn>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
>>>>>>> ab48f71ea6e72d5988225bc7313d4c4300cbadae
