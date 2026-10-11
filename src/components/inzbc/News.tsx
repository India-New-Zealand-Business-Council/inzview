import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Dialog } from './Dialog';
import { Image } from '@/components/ui/image';
import type { NewsPost } from './news';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime';

/** Shared open/close state for whichever card was last activated - one instance per page
    (Home carries 3 cards, the News page carries all 12), each rendering its own NewsArticleDialog. */
export function useNewsDialog() {
  const [active, setActive] = useState<{ post: NewsPost; trigger: HTMLElement } | null>(null);
  return {
    active,
    open: (post: NewsPost, trigger: HTMLElement) => setActive({ post, trigger }),
    close: () => setActive(null),
  };
}

/** Turns the data file's `[label](url)` markers into real links, instead of reaching for a
    markdown library or dangerouslySetInnerHTML for 12 articles' worth of plain text. Every
    link in news.ts points off-site, so each opens in a new tab except mailto:, which stays in
    the current one like every other mailto: link on this site. */
export function renderInline(text: string): React.ReactNode {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const [, label, href] = match;
    const isMailto = href.startsWith('mailto:');
    nodes.push(
      <a
        key={i++}
        href={href}
        {...(isMailto ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        className="underline decoration-1 underline-offset-2 hover:text-plum"
      >
        {label}
      </a>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** The full-article pop-up, shared by the Home "Latest news" cards and the News page's cards.
    Accessibility behaviour (focus trap, Esc/backdrop close, focus-return, scroll lock, AA
    contrast, 320px width, reduced motion) all comes from the shared Dialog component. */
export function NewsArticleDialog({
  post,
  triggerEl,
  onClose,
}: {
  post: NewsPost | null;
  triggerEl: HTMLElement | null;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = post !== null;
  const titleId = post ? `news-dialog-title-${post.slug}` : undefined;

  if (!post) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      triggerEl={triggerEl}
      titleId={titleId}
      initialFocusRef={closeButtonRef}
      widthClassName="w-[min(40rem,calc(100vw-2rem))]"
    >
      {post.cover ? (
        <Image src={`/blog/${post.cover}`} alt={post.alt} loading="lazy" className="aspect-[16/9] w-full object-cover" />
      ) : null}
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-plum">{post.date}</p>
            <h2 id={titleId} className="mt-1 font-heading text-2xl text-ink">
              {post.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`inline-flex h-11 w-11 flex-none items-center justify-center rounded-full text-ink hover:bg-mist ${FOCUS}`}
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>
        <div className="mt-5 space-y-4 text-foreground">
          {post.body.map((block, i) => {
            if (block.type === 'h') {
              return (
                <h3 key={i} className="pt-1 font-heading text-lg text-ink">
                  {renderInline(block.text)}
                </h3>
              );
            }
            if (block.type === 'ul') {
              return (
                <ul key={i} className="list-disc space-y-1.5 pl-5">
                  {block.items.map((item, j) => (
                    <li key={j}>{renderInline(item)}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{renderInline(block.text)}</p>;
          })}
        </div>
      </div>
    </Dialog>
  );
}
