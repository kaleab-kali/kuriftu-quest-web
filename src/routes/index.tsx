import FormPage from '@/pages/form';
import NotFound from '@/pages/not-found';
import Wrapper from '@/providers/Wrapper';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const UserPage = lazy(() => import('@/pages/users'));
const UserDetailPage = lazy(
  () => import('@/pages/users/UserDetailPage')
);

// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
      <Wrapper>
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </Wrapper> 
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        {
          path: 'user',
          element: <UserPage />
        },
        {
          path: 'user/details',
          element: <UserDetailPage />
        },
        {
          path: 'form',
          element: <FormPage />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: <SignInPage />,
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
