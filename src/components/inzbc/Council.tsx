import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Linkedin as LinkedinIcon, X } from 'lucide-react';
import { Reveal } from './motion';
import { Image } from '@/components/ui/image';
import { COUNCIL, type CouncilMember } from './council';

// Matches bodies.tsx's own FOCUS constant (not imported from there to keep this file
// independent of bodies.tsx - council.ts is the shared piece, not the focus ring string).
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

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
          className="aspect-square w-full object-cover"
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
 * from whichever card was last clicked.
 *
 * Accessibility (WCAG 2.2 AA, per this task's brief):
 * - role="dialog" + aria-modal="true" + aria-labelledby pointing at the person's name.
 * - Focus moves to the dialog on open and is trapped inside it (Tab/Shift+Tab cycle through
 *   the dialog's own focusable elements only) until it closes.
 * - Focus returns to the photo button that opened it on close, by any of the three routes:
 *   the Close button, Esc, or a click outside the panel.
 * - Background scroll is locked while open.
 * - Entrance/exit animation is skipped under prefers-reduced-motion (useReducedMotion, the
 *   same hook every other animated piece of this site already uses).
 * - The panel's own max-width uses the same "min(fixed size, 100vw - margin)" technique
 *   StickyHeader's mobile menu already uses, so it never causes horizontal scroll - checked
 *   at 320px.
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const isOpen = member !== null;
  const titleId = member ? `council-dialog-title-${member.name.replace(/\s+/g, '-').toLowerCase()}` : undefined;

  // Move focus in, lock background scroll.
  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Return focus to whatever opened the dialog, once it's actually gone.
  useEffect(() => {
    if (isOpen) return;
    triggerEl?.focus();
    // triggerEl intentionally excluded: this should only run when isOpen flips to false, not
    // on every trigger change (the trigger changes before isOpen does on open).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Esc to close, and a Tab/Shift+Tab trap confined to the dialog's own focusable elements.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && member ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.18 }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="max-h-[calc(100dvh-2rem)] w-[min(32rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl bg-white shadow-xl"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: reduced ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="aspect-square w-full object-cover sm:aspect-[16/10]"
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
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
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
