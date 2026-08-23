import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet, useParams } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import FtaPage from '@/components/pages/FtaPage';
import FtaExplainerPage from '@/components/pages/FtaExplainerPage';
import InnerPage from '@/components/inzbc/InnerPage';
import { EVENT_SLUGS } from '@/components/inzbc/bodies';
import { PAGES } from '@/components/inzbc/pages';

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

/**
 * Old inzbc.org article URLs.
 *
 * These are currently outbound links to a different site — every event row, and three
 * hand-written citations, link to https://www.inzbc.org/post/<slug> as their source. They
 * work today because inzbc.org is still the old Wix site. INZBC intends to point that
 * domain at this build, and on the day they do, all of them become links into this site,
 * to a path that would otherwise hit the catch-all below and land on the homepage. Every
 * sourced claim on the site would stop being checkable, silently, with nothing logged.
 *
 * So the path is answered here instead. An event slug goes to its own row in the archive;
 * anything else — old news posts, and the two the homepage cites by hand — goes to /news,
 * which is the closest thing this build has to the old blog. Neither is as good as the
 * original article, but both beat a silent bounce to the homepage.
 *
 * This route is inert until the domain moves: nothing on the site links to /post/ today.
 */
function PostRedirect() {
  const { slug = '' } = useParams();
  return <Navigate to={EVENT_SLUGS.has(slug) ? `/events/past#${slug}` : '/news'} replace />;
}

// Routes are generated from the same table the navigation reads, so a nav item and its
// destination cannot drift apart. The Studio build had nineteen of twenty pages returning
// 404 for days because those two lists were maintained separately.
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
          routeMetadata: { pageIdentifier: 'home' },
        },
        {
          path: 'fta',
          element: <FtaPage />,
          routeMetadata: { pageIdentifier: 'fta' },
        },
        {
          path: 'fta/explainer',
          element: <FtaExplainerPage />,
          routeMetadata: { pageIdentifier: 'fta-explainer' },
        },
        // /fta gets its own page component above; its entry stays in the PAGES table in
        // pages.ts (NAV is a separate, hand-maintained list and doesn't read PAGES, so nothing
        // else depends on this) and is filtered out only here, to avoid a second route
        // registered for the same path. /fta/explainer was never in PAGES, so it needs no
        // filtering of its own.
        ...PAGES.filter((page) => page.path !== '/fta').map((page) => ({
          // react-router paths are relative to the parent, so the leading slash comes off.
          path: page.path.replace(/^\//, ''),
          element: <InnerPage page={page} />,
          routeMetadata: { pageIdentifier: page.path.replace(/^\//, '') },
        })),
        {
          // Sunil's migration guide (§5, Redirects): "/trade-bazaar → /india-market-opportunities".
          // Trade Bazaar never had a route in this rebuild, but the guide names the redirect
          // explicitly, so it's honoured rather than left to the catch-all below.
          path: 'trade-bazaar',
          element: <Navigate to="/india-market-opportunities" replace />,
        },
        // The rest of §5's redirect table, mapped to where each destination actually lives in
        // this rebuild (which doesn't always match the guide's proposed slug — e.g. Trade Shows
        // folded into /trade-resources, not a standalone /trade-missions route). Without these,
        // every one of these old inzbc.org URLs hit the catch-all below and silently bounce to
        // Home instead of their real destination — the exact SEO risk §5 exists to prevent.
        { path: 'about-us', element: <Navigate to="/about-inzbc" replace /> },
        { path: 'our-sponsors', element: <Navigate to="/partners" replace /> },
        { path: 'upcoming-events', element: <Navigate to="/events" replace /> },
        { path: 'trade-shows', element: <Navigate to="/trade-resources" replace /> },
        { path: 'join-inzbc', element: <Navigate to="/membership" replace /> },
        { path: 'membership-form', element: <Navigate to="/membership" replace /> },
        { path: 'news/categories/news', element: <Navigate to="/news" replace /> },
        { path: 'post/:slug', element: <PostRedirect /> },
        {
          path: '*',
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_NAME },
);

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
