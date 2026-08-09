import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import InnerPage from '@/components/inzbc/InnerPage';
import { PAGES } from '@/components/inzbc/pages';

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
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
        ...PAGES.map((page) => ({
          // react-router paths are relative to the parent, so the leading slash comes off.
          path: page.path.replace(/^\//, ''),
          element: <InnerPage page={page} />,
          routeMetadata: { pageIdentifier: page.path.replace(/^\//, '') },
        })),
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
