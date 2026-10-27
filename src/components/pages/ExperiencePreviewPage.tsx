import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CalendarDays, Check, CircleHelp, LockKeyhole, Users } from 'lucide-react';
import { ScrollProgress, StickyHeader } from '@/components/inzbc/motion';
import { ART, LINKS } from '@/components/inzbc/content';
import { NAV } from '@/components/inzbc/pages';
import { INZBC_EVENTS } from '@/components/inzbc/bodies';
import Footer from '@/components/inzbc/Footer';
import {
  aucklandTodayIso,
  registrationPreviewSummary,
  upcomingPreviewEvents,
  type AttendancePreference,
} from '@/lib/experience-preview';

/**
 * Review-only concept in response to Sunil's 27 October question:
 * "could people register and access members' resources through one website?"
 *
 * Deliberately NOT wired to Wix Events, payments, CRM, or member auth: doing
 * so before INZBC resolves identity, retention, payment and system-of-record
 * decisions would create a shadow membership/attendee database.
 *
 * The only live links here lead to existing public resources, the known
 * event organiser site and the existing Member Jungle join service.
 */
const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime';
type View = 'events' | 'members';
type ResourceTab = 'resources' | 'membership' | 'events';

export default function ExperiencePreviewPage() {
  const [view, setView] = useState<View>('events');
  const [eventSlug, setEventSlug] = useState('');
  const [people, setPeople] = useState<AttendancePreference>('one');
  const [reviewing, setReviewing] = useState(false);
  const [tab, setTab] = useState<ResourceTab>('resources');

  // Use the public site's actual event list, not fictional availability or prices.
  const events = useMemo(
    () => upcomingPreviewEvents(INZBC_EVENTS, aucklandTodayIso(new Date())),
    [],
  );
  const chosenEvent = events.find((event) => event.sourceSlug === eventSlug);
  const summary = registrationPreviewSummary(chosenEvent, people);
  const isSummit = chosenEvent?.sourceSlug === 'registrations-are-open-new-zealand-india-business-sport-and-innovation-summit';
  const destination = isSummit ? LINKS.summitSite : chosenEvent ? `/events#${chosenEvent.sourceSlug}` : '/events';

  const chooseView = (next: View) => {
    setView(next);
    setReviewing(false);
  };

  return (
    <div className="min-h-screen bg-white font-paragraph text-foreground">
      <ScrollProgress />
      <StickyHeader logo={ART.logo} links={NAV} cta={{ label: 'Join INZBC', href: LINKS.join }} />
      <main id="main-content">
        <section className="bg-deep px-6 pb-16 pt-40 text-white">
          <div className="mx-auto max-w-6xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime/50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-lime">
              <CircleHelp size={15} aria-hidden="true" /> Review concept · Not live registration
            </p>
            <h1 className="max-w-4xl font-heading text-4xl font-semibold leading-tight md:text-6xl">
              One INZBC website. A clearer journey for events and members.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/75">
              Explore how event enquiries, membership services and resources could feel together.
              This is a non-production demonstration for INZBC to evaluate, not a member login,
              event booking or payment service.
            </p>
            <div className="mt-10 flex flex-wrap gap-3" aria-label="Choose experience">
              <button type="button" onClick={() => chooseView('events')} aria-pressed={view === 'events'}
                className={`rounded-full px-6 py-3 font-semibold ${FOCUS} ${view === 'events' ? 'bg-lime text-navy' : 'border border-white/40 text-white hover:bg-white/10'}`}>
                <CalendarDays size={18} aria-hidden="true" className="mr-2 inline" /> Event experience
              </button>
              <button type="button" onClick={() => chooseView('members')} aria-pressed={view === 'members'}
                className={`rounded-full px-6 py-3 font-semibold ${FOCUS} ${view === 'members' ? 'bg-lime text-navy' : 'border border-white/40 text-white hover:bg-white/10'}`}>
                <Users size={18} aria-hidden="true" className="mr-2 inline" /> Members area
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14">
          {view === 'events' ? (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
              <div>
                <h2 className="font-heading text-3xl font-semibold text-ink">Explore event registration</h2>
                <p className="mt-3 max-w-2xl text-foreground/75">
                  Choose a real event from the public calendar and preview a simple registration
                  flow. The selection is only held in this page while it is open: no attendee
                  details, payment or reservation are submitted.
                </p>
                {events.length === 0 ? (
                  <div role="status" className="mt-8 rounded-2xl border border-ink/15 bg-mist p-7">
                    There are no future-dated events in the current public listing. The workflow
                    needs an INZBC-approved event feed before real registration can begin.
                    <Link className={`mt-3 block font-semibold text-plum underline ${FOCUS}`} to="/events">Browse event archive</Link>
                  </div>
                ) : (
                  <form className="mt-8 space-y-6" onSubmit={(event) => { event.preventDefault(); setReviewing(Boolean(summary)); }}>
                    <div>
                      <label htmlFor="preview-event" className="block text-sm font-semibold text-ink">Select an event</label>
                      <select id="preview-event" required value={eventSlug} onChange={(event) => { setEventSlug(event.target.value); setReviewing(false); }}
                        className={`mt-2 w-full rounded-xl border border-ink/25 bg-white px-4 py-4 text-ink ${FOCUS}`}>
                        <option value="">Choose an upcoming INZBC event</option>
                        {events.map((item) => <option key={item.sourceSlug} value={item.sourceSlug}>{item.title} — {item.date}</option>)}
                      </select>
                      {chosenEvent && <div className="mt-3 rounded-xl bg-mist p-4 text-sm">
                        <p className="font-semibold text-ink">{chosenEvent.date}</p>
                        {chosenEvent.venue && <p className="mt-1 text-foreground/75">{chosenEvent.venue}</p>}
                        <p className="mt-2 text-foreground/75">{chosenEvent.description}</p>
                      </div>}
                    </div>
                    <fieldset>
                      <legend className="text-sm font-semibold text-ink">How many people would attend?</legend>
                      <div className="mt-3 flex gap-3">
                        {(['one', 'two', 'three'] as const).map((option, index) => (
                          <label key={option} className={`cursor-pointer rounded-xl border px-5 py-3 font-semibold ${FOCUS} ${people === option ? 'border-plum bg-mist text-plum' : 'border-ink/20 text-ink'}`}>
                            <input type="radio" name="preview-headcount" value={option} checked={people === option}
                              onChange={() => { setPeople(option); setReviewing(false); }} className="mr-2 accent-plum" />
                            {index + 1}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <button type="submit" disabled={!summary}
                      className={`inline-flex items-center gap-3 rounded-full bg-plum px-7 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 ${FOCUS}`}>
                      Review selection <ArrowRight size={18} aria-hidden="true" />
                    </button>
                  </form>
                )}
              </div>
              <aside className="h-fit rounded-3xl bg-mist p-7" aria-live="polite">
                <p className="text-xs font-semibold uppercase tracking-widest text-plum">Registration preview</p>
                <h3 className="mt-3 font-heading text-2xl text-ink">Your event journey</h3>
                {reviewing && summary ? (
                  <div className="mt-6 space-y-5">
                    <p className="flex items-start gap-2 text-sm font-medium text-ink"><Check size={20} className="shrink-0 text-plum" aria-hidden="true" /> {summary}</p>
                    <p className="text-sm text-foreground/80">
                      Your selection was not saved or sent to INZBC. To make an actual booking,
                      use the event organiser's existing process.
                    </p>
                    {destination.startsWith('http') ? (
                      <a href={destination} target="_blank" rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white ${FOCUS}`}>
                        Visit organiser's site <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    ) : (
                      <Link to={destination} className={`inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white ${FOCUS}`}>
                        View event details <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="mt-6 space-y-3 text-sm text-foreground/75">
                    <p>1. Choose an upcoming event</p><p>2. Select an indicative attendee count</p>
                    <p>3. Review your choices and continue to the existing organiser</p>
                  </div>
                )}
                <p className="mt-8 border-t border-ink/15 pt-5 text-xs text-foreground/70">
                  No seats, tickets, pricing, attendee records or confirmation numbers are created here.
                </p>
              </aside>
            </div>
          ) : (
            <div>
              <h2 className="font-heading text-3xl font-semibold text-ink">One place for member services</h2>
              <p className="mt-3 max-w-3xl text-foreground/75">
                This is a public design preview. No person is signed in, no membership is verified,
                and members-only data or resources are exposed. Existing joining and renewal
                stay with Member Jungle until INZBC approves a different system of record.
              </p>
              <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
                <nav aria-label="Members area preview" className="flex flex-wrap gap-2 lg:flex-col">
                  {([
                    ['resources', 'Public resources'],
                    ['membership', 'My membership'],
                    ['events', 'Events and briefings'],
                  ] as const).map(([value, label]) => (
                    <button key={value} type="button" onClick={() => setTab(value)} aria-current={tab === value ? 'page' : undefined}
                      className={`rounded-xl border px-5 py-3 text-left text-sm font-semibold ${FOCUS} ${tab === value ? 'border-plum bg-mist text-plum' : 'border-ink/15 bg-white text-ink hover:bg-mist'}`}>
                      {label}
                    </button>
                  ))}
                </nav>
                <div className="min-h-[19rem] rounded-3xl border border-ink/15 bg-white p-7 shadow-sm">
                  {tab === 'resources' && (
                    <div>
                      <h3 className="font-heading text-2xl text-ink">Knowledge and briefings</h3>
                      <p className="mt-2 text-sm text-foreground/75">These links point to existing public content, not gated member records.</p>
                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <Link to="/fta" className={`rounded-2xl bg-mist p-5 ${FOCUS}`}>
                          <span className="block font-semibold text-ink">NZ–India FTA Centre</span>
                          <span className="mt-2 block text-sm text-foreground/70">Public trade guidance and updates</span>
                        </Link>
                        <a href={LINKS.reportIssuu} target="_blank" rel="noopener noreferrer"
                          className={`rounded-2xl bg-mist p-5 ${FOCUS}`}>
                          <span className="block font-semibold text-ink">India Report 2025</span>
                          <span className="mt-2 block text-sm text-foreground/70">Publicly available publication</span>
                        </a>
                      </div>
                      <div className="mt-6 flex items-start gap-3 rounded-xl border border-ink/15 p-4 text-sm">
                        <LockKeyhole size={20} className="shrink-0 text-plum" aria-hidden="true" />
                        <p><strong>Future member-only resources:</strong> not active until INZBC agrees identity, access rights and the approved source of membership truth.</p>
                      </div>
                    </div>
                  )}
                  {tab === 'membership' && (
                    <div>
                      <h3 className="font-heading text-2xl text-ink">Membership overview</h3>
                      <div className="mt-5 rounded-xl bg-mist p-5">
                        <p className="text-sm font-semibold text-ink">Membership status: Not connected</p>
                        <p className="mt-2 text-sm text-foreground/75">We cannot show renewal dates, invoices or membership level without a verified identity and integration with the authoritative provider.</p>
                      </div>
                      <a href={LINKS.join} target="_blank" rel="noopener noreferrer"
                        className={`mt-6 inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white ${FOCUS}`}>
                        Join through existing membership service <ArrowUpRight size={17} aria-hidden="true" />
                      </a>
                    </div>
                  )}
                  {tab === 'events' && (
                    <div>
                      <h3 className="font-heading text-2xl text-ink">Your event access</h3>
                      <p className="mt-3 text-sm text-foreground/75">Member tickets, special pricing and attendance history require a real integration; nothing is assumed here.</p>
                      <button type="button" onClick={() => chooseView('events')}
                        className={`mt-6 inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white ${FOCUS}`}>
                        Explore event journey <ArrowRight size={17} aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
        <section className="bg-mist px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-heading text-2xl text-ink">What INZBC would decide before going live</h2>
            <ul className="mt-5 grid gap-4 text-sm text-foreground/85 md:grid-cols-3">
              <li className="rounded-2xl bg-white p-5">Which event provider is authoritative, and whether tickets, refunds, check-in and consent are in scope.</li>
              <li className="rounded-2xl bg-white p-5">Whether to retain/integrate or formally replace Member Jungle, including identity, retention and renewals.</li>
              <li className="rounded-2xl bg-white p-5">Who owns support, costs, member privacy approvals and the business rules after handover.</li>
            </ul>
            <p className="mt-6 text-sm text-foreground/75">This route is not linked from public navigation; it is intended for stakeholder review before a scoped build is approved.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
