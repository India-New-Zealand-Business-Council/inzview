import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, CircleAlert, FileText, LockKeyhole } from 'lucide-react';
import { ScrollProgress, StickyHeader } from '@/components/inzbc/motion';
import { ART, LINKS } from '@/components/inzbc/content';
import { NAV } from '@/components/inzbc/pages';
import Footer from '@/components/inzbc/Footer';

type Stage = Readonly<{
  name: string;
  stage: string;
  delivered: string;
  needed: string;
}>;

const STAGES: readonly Stage[] = [
  {
    name: 'Collect and check sources',
    stage: '01',
    delivered: 'Collector, source-health validation and the SIP-185 mandatory source register exist in code. A read-only capture exporter is awaiting integration review.',
    needed: 'A genuine collection tied to one authorised run, plus actual analyst-confirmed outcomes for each of the 112 mandatory sources.',
  },
  {
    name: 'Assess and verify',
    stage: '02',
    delivered: 'SIP-050 scoring, candidate routing, exclusion and verification gates have API and test coverage.',
    needed: 'A safe server-side batch import, plus actual analysts verifying real candidate items and marking false or duplicate signals.',
  },
  {
    name: 'Draft the Daily Brief',
    stage: '03',
    delivered: 'Brief Builder, report versions and the SIP-186 structured template exist. A seeded UI demo is available locally.',
    needed: 'A real report version derived from source-backed candidates, independently reviewed and preserved with audit evidence.',
  },
  {
    name: 'Human review and decision',
    stage: '04',
    delivered: 'QA and CEO decision gates, permissions and immutable audit records exist.',
    needed: 'Run-specific independent QA, an actual CEO ruling, and separate distribution authority before any manual sending.',
  },
];

const SECTIONS = [
  ['Executive judgement', 'The one verified development the CEO should know first.'],
  ['Executive summary', 'Three to five source-backed points with confidence and uncertainty.'],
  ['Critical / High signals', 'Only after official or independent verification; no unverified claim promoted.'],
  ['Bilateral developments', 'What actually changed and why it matters for New Zealand and India.'],
  ['Opportunities', 'Evidence-backed possibilities, not invented economic benefits.'],
  ['Threats and risks', 'Verified issues, owner and recommended next check.'],
  ['CEO actions', 'Owner, urgency, deadline and required evidence.'],
  ['Member actions', 'Only if content and audience have been approved.'],
  ['Watch list', 'Tracked items with real triggers and review dates.'],
  ['Carry-forward', 'Outstanding items from earlier runs, with what changed.'],
  ['No material new signal', 'Explicitly scoped conclusions only after complete source review.'],
  ['Source coverage and exceptions', '112 mandatory source outcomes, fallback attempts and gaps.'],
  ['QA and distribution', 'Review, CEO decision and separate delivery record, if authorised.'],
] as const;

const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime';

export default function SipPreviewPage() {
  const [step, setStep] = useState(0);
  const [detail, setDetail] = useState<number | null>(0);
  const selected = STAGES[step];

  return (
    <div className="min-h-screen bg-white font-paragraph text-foreground">
      <ScrollProgress />
      <StickyHeader logo={ART.logo} links={NAV} cta={{ label: 'Join INZBC', href: LINKS.join }} />
      <main id="main-content">
        <section className="bg-deep px-6 pb-16 pt-40 text-white">
          <div className="mx-auto max-w-6xl">
            <p className="inline-flex gap-2 rounded-full border border-lime/40 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-lime">
              <FileText size={16} aria-hidden="true" /> Stakeholder walkthrough · Draft
            </p>
            <h1 className="mt-7 max-w-4xl font-heading text-4xl font-semibold md:text-6xl">
              What the SIP agent does, and what a daily report looks like.
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-white/75">
              For INZBC review: a transparent explanation of the built workflow, current limitations
              and an editorial preview of the proposed Daily Intelligence Brief. There is no live
              trade data, authenticated SIP connection or authorised publication on this page.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-heading text-3xl font-semibold text-ink">The workflow, from source to decision</h2>
          <p className="mt-3 max-w-3xl text-foreground/75">Select a stage to see the code that exists and the operational evidence still missing.</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-[16rem_minmax(0,1fr)]">
            <nav aria-label="SIP workflow stages" className="flex flex-col gap-2">
              {STAGES.map((item, index) => (
                <button type="button" key={item.stage} onClick={() => setStep(index)}
                  aria-current={index === step ? 'step' : undefined}
                  className={`rounded-xl border px-4 py-4 text-left text-sm font-semibold ${FOCUS} ${index === step ? 'border-plum bg-mist text-plum' : 'border-ink/15 text-ink hover:bg-mist'}`}>
                  <span className="mr-3 text-xs opacity-70">{item.stage}</span>{item.name}
                </button>
              ))}
            </nav>
            <div className="rounded-3xl bg-mist p-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-plum">Stage {selected.stage}</p>
              <h3 className="mt-2 font-heading text-2xl text-ink">{selected.name}</h3>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="rounded-xl bg-white p-5">
                  <p className="flex items-center gap-2 font-semibold text-ink"><CheckCircle2 size={19} className="text-plum" aria-hidden="true" /> Implemented / tested</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">{selected.delivered}</p>
                </div>
                <div className="rounded-xl bg-white p-5">
                  <p className="flex items-center gap-2 font-semibold text-ink"><CircleAlert size={19} className="text-plum" aria-hidden="true" /> Still needs real evidence</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">{selected.needed}</p>
                </div>
              </div>
              <div className="mt-6 flex items-start gap-2 text-sm text-foreground/75">
                <LockKeyhole size={18} className="shrink-0" aria-hidden="true" />
                AI drafts do not bypass named human review or distribution authority.
              </div>
            </div>
          </div>
        </section>
        <section className="bg-mist px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-plum">Illustrative report template — no actual findings</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-ink">The Daily Intelligence Brief</h2>
            <p className="mt-3 max-w-3xl text-foreground/75">These are the thirteen SIP-186 sections. Expand them to see their purpose. No example claim is a real news item or verified signal.</p>
            <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
              <div className="space-y-2">
                {SECTIONS.map(([title, description], index) => (
                  <div key={title} className="overflow-hidden rounded-xl bg-white">
                    <button type="button" aria-expanded={detail === index} onClick={() => setDetail(detail === index ? null : index)}
                      className={`flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-ink ${FOCUS}`}>
                      <span>{String(index + 1).padStart(2, '0')} · {title}</span>
                      <span aria-hidden="true" className="text-plum">{detail === index ? '−' : '+'}</span>
                    </button>
                    {detail === index && <p className="border-t border-ink/10 px-5 py-4 text-sm text-foreground/75">{description}</p>}
                  </div>
                ))}
              </div>
              <aside className="h-fit rounded-2xl bg-white p-6">
                <h3 className="font-heading text-xl text-ink">Sample status</h3>
                <dl className="mt-5 space-y-4 text-sm">
                  <div><dt className="font-semibold text-ink">Document</dt><dd>Illustrative outline only</dd></div>
                  <div><dt className="font-semibold text-ink">Real run ID</dt><dd>Not recorded</dd></div>
                  <div><dt className="font-semibold text-ink">Mandatory source checks</dt><dd>Not completed</dd></div>
                  <div><dt className="font-semibold text-ink">QA / CEO decision</dt><dd>Not performed</dd></div>
                  <div><dt className="font-semibold text-ink">Distribution</dt><dd>Not authorised</dd></div>
                </dl>
                <p className="mt-5 border-t border-ink/10 pt-5 text-xs text-foreground/75">
                  A sample structure is not a real completed report. Every actual finding requires citations and review.
                </p>
              </aside>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="font-heading text-2xl text-ink">What INZBC can decide after seeing this</h2>
          <p className="mt-3 max-w-3xl text-foreground/75">The priority sectors, ideal report length, delivery frequency, internal readers and which separately approved extracts members should receive. These decisions shape a real run; they do not replace the controlled launch/QA gates.</p>
          <Link to="/experience-preview" className={`mt-7 inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3 font-semibold text-white ${FOCUS}`}>
            Explore events and members area <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
