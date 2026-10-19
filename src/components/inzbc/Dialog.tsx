import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Shared accessible dialog shell (WCAG 2.2 AA), extracted from Council.tsx's original
 * MemberDialog so the News article pop-up doesn't reimplement the same behaviour: role=
 * "dialog" + aria-modal, a Tab/Shift+Tab focus trap confined to the panel's own focusable
 * elements, Esc-to-close, backdrop-click-to-close, background scroll lock, focus returned to
 * whatever triggered it on close, and reduced-motion awareness.
 *
 * Callers own everything visual - photo, text, the close button itself - via children, so
 * Council's bio dialog (close button floating over the photo) and the News dialog (close
 * button in a plain header row) can look different while sharing one accessibility
 * implementation. The caller's close button ref is what receives focus on open.
 */
export function Dialog({
  open,
  onClose,
  triggerEl,
  titleId,
  initialFocusRef,
  widthClassName = 'w-[min(32rem,calc(100vw-2rem))]',
  children,
}: {
  open: boolean;
  onClose: () => void;
  triggerEl: HTMLElement | null;
  titleId: string | undefined;
  initialFocusRef: React.RefObject<HTMLElement>;
  widthClassName?: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Move focus in, lock background scroll.
  useEffect(() => {
    if (!open) return;
    initialFocusRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, initialFocusRef]);

  // Return focus to whatever opened the dialog, once it's actually gone.
  useEffect(() => {
    if (open) return;
    triggerEl?.focus();
    // triggerEl intentionally excluded: this should only run when open flips to false, not on
    // every trigger change (the trigger changes before open does on open).
     
  }, [open]);

  // Esc to close, and a Tab/Shift+Tab trap confined to the dialog's own focusable elements.
  useEffect(() => {
    if (!open) return;
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
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
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
            className={`max-h-[calc(100dvh-2rem)] ${widthClassName} overflow-y-auto rounded-2xl bg-white shadow-xl`}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: reduced ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
