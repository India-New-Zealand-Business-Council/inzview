import React, { useRef, useState } from 'react';
import { Linkedin as LinkedinIcon, X } from 'lucide-react';
import { Reveal } from './motion';
import { Dialog } from './Dialog';
import { Image } from '@/components/ui/image';
import { COUNCIL, type CouncilMember } from './council';

// Matches bodies.tsx's own FOCUS constant (not imported from there to keep this file
// independent of bodies.tsx - council.ts is the shared piece, not the focus ring string).
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime';

/**
 * One member's photo + name + title. The photo is a real <button> (not a div with a click
 * handler) so it's focusable and opens with Enter or Space for free - no extra key handling
 * needed for activation, only for what happens after it opens.
 *
 * Deliberately the same markup/classes CouncilBody's old Person component used
 * (rounded-2xl bg-mist card, aspect-square photo, p-6 text block) - the brief was to change
 * the interaction, not the layout.
 */
function MemberTrigger({
  member,
  onOpen,
}: {
  member: CouncilMember;
  onOpen: (member: CouncilMember, trigger: HTMLButtonElement) => void;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={() => triggerRef.current && onOpen(member, triggerRef.current)}
      className={`block h-full w-full overflow-hidden rounded-2xl bg-mist text-left transition-shadow hover:shadow-md ${FOCUS}`}
    >
      {member.photo ? (
        <Image
          src={member.photo}
          alt={`${member.name}, ${member.title}`}
          loading="lazy"
          className="aspect-square w-full grayscale object-cover"
        />
      ) : null}
      <div className="p-6">
        <h3 className="font-heading text-lg text-ink">{member.name}</h3>
        <p className="mt-1 text-sm text-foreground">{member.title}</p>
      </div>
    </button>
  );
}

/**
 * The bio pop-up. One instance, shared by every trigger in both groups - member/trigger come
 * from whichever card was last clicked. All the dialog accessibility behaviour (focus trap,
 * Esc/backdrop close, focus-return, scroll lock, reduced motion, responsive width) lives in
 * the shared Dialog component; this just supplies the member-specific markup.
 */
function MemberDialog({
  member,
  triggerEl,
  onClose,
}: {
  member: CouncilMember | null;
  triggerEl: HTMLButtonElement | null;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = member !== null;
  const titleId = member ? `council-dialog-title-${member.name.replace(/\s+/g, '-').toLowerCase()}` : undefined;

  if (!member) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} triggerEl={triggerEl} titleId={titleId} initialFocusRef={closeButtonRef}>
      <div className="relative">
        {member.photo ? (
          <Image
            src={member.photo}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="aspect-square w-full grayscale object-cover sm:aspect-[16/10]"
          />
        ) : null}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white ${FOCUS}`}
        >
          <X aria-hidden="true" size={20} />
        </button>
      </div>
      <div className="p-6 sm:p-8">
        <h2 id={titleId} className="font-heading text-2xl text-ink">
          {member.name}
        </h2>
        <p className="mt-1 text-sm font-medium text-plum">{member.title}</p>
        <p className="mt-5 whitespace-pre-line text-foreground">{member.bio}</p>
        {member.linkedin ? (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-white hover:bg-ink/90 ${FOCUS}`}
          >
            <LinkedinIcon aria-hidden="true" size={16} />
            View on LinkedIn
          </a>
        ) : null}
        {!member.photo ? (
          <button
            type="button"
            onClick={onClose}
            className={`mt-6 inline-flex min-h-11 items-center rounded-full border border-ink/20 px-5 text-sm font-medium text-ink hover:bg-mist ${FOCUS}`}
          >
            Close
          </button>
        ) : null}
      </div>
    </Dialog>
  );
}

/**
 * The Executive Council grid: two groups (Board Members, Executive Team), each a photo grid
 * of MemberTrigger buttons, sharing one MemberDialog. Content comes entirely from council.ts
 * - add, remove or edit a member there, nothing here needs to change.
 */
export default function Council() {
  const [active, setActive] = useState<{ member: CouncilMember; trigger: HTMLButtonElement } | null>(null);

  const open = (member: CouncilMember, trigger: HTMLButtonElement) => setActive({ member, trigger });
  const close = () => setActive(null);

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {COUNCIL.map((group, groupIndex) => (
          <React.Fragment key={group.heading}>
            <Reveal>
              <h2
                className={`font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl ${
                  groupIndex > 0 ? 'mt-16' : ''
                }`}
              >
                {group.heading}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {group.members.map((member, i) => (
                <Reveal key={member.name} delay={i * 0.05}>
                  <MemberTrigger member={member} onOpen={open} />
                </Reveal>
              ))}
            </div>
          </React.Fragment>
        ))}

        <Reveal delay={0.1}>
          <p className="mt-10 text-sm text-foreground/60">Select a photo to read that person's full bio.</p>
        </Reveal>
      </div>

      <MemberDialog member={active?.member ?? null} triggerEl={active?.trigger ?? null} onClose={close} />
    </section>
  );
}
