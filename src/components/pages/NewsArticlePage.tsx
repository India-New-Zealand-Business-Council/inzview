import { Link } from 'react-router-dom';
import { ART, LINKS } from '@/components/inzbc/content';
import { NAV } from '@/components/inzbc/pages';
import { ScrollProgress, StickyHeader } from '@/components/inzbc/motion';
import Footer from '@/components/inzbc/Footer';
import { NewsArticleContent } from '@/components/inzbc/News';
import type { NewsPost } from '@/components/inzbc/news';
import { Image } from '@/components/ui/image';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum';

/** A shareable destination for articles supplied with their own URL and SEO settings. */
export default function NewsArticlePage({ post }: { post: NewsPost }) {
  return (
    <div className="min-h-screen bg-white font-paragraph text-foreground">
      <ScrollProgress />
      <StickyHeader logo={ART.logo} links={NAV} cta={{ label: 'Join INZBC', href: LINKS.join }} />
      <main className="px-6 pb-24 pt-32 sm:pt-40">
        <article className="mx-auto max-w-4xl" aria-labelledby="article-title">
          <nav aria-label="Article navigation" className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-plum">
            <Link to="/fta" className={`inline-flex min-h-11 items-center underline underline-offset-4 ${FOCUS}`}>
              FTA Centre
            </Link>
            <Link to="/news" className={`inline-flex min-h-11 items-center underline underline-offset-4 ${FOCUS}`}>
              All news
            </Link>
          </nav>
          <header>
            <time dateTime={post.sortKey} className="text-sm font-medium text-plum">{post.date}</time>
            <h1 id="article-title" className="mt-3 font-heading text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              {post.title}
            </h1>
            {post.cover ? (
              <Image src={`/blog/${post.cover}`} alt={post.alt} loading="eager" fetchPriority="high" className="mt-8 h-auto w-full rounded-2xl" />
            ) : null}
          </header>
          <div className="mx-auto mt-10 max-w-3xl space-y-5 leading-relaxed [&_a]:break-words [&_h2]:pt-6 [&_h2]:text-2xl">
            <NewsArticleContent post={post} heading="h2" />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
