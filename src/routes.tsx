import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import AuthGuard from './components/AuthGuard';
import GuestGuard from './components/GuestGuard';
import UserRoleGuard from './components/UserRoleGuard';
import LoadingScreen from './components/LoadingScreen';
import DashboardLayout from './components/dashboard/DashboardLayout';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// Authentication pages
const Login = Loadable(lazy(() => import('./pages/authentication/Login/Login')));
const PasswordRecovery = Loadable(lazy(() => import('./pages/authentication/PasswordRecovery')));
const PasswordReset = Loadable(lazy(() => import('./pages/authentication/PasswordReset')));
const Register = Loadable(lazy(() => import('./pages/authentication/Register')));

// Dashboard pages
const Account = Loadable(lazy(() => import('./pages/dashboard/Account')));
const Overview = Loadable(lazy(() => import('./pages/dashboard/Overview')));

const IssuerWorkspace = Loadable(
  lazy(() => import('./pages/dashboard/manager/issuers/UserWorkspace.swr'))
);
const IssuerOnboardProfile = Loadable(
  lazy(() => import('./pages/dashboard/manager/issuers/ProfileWorkspace.swr'))
);

const IssuerProfile = Loadable(lazy(() => import('./pages/dashboard/issuer/IssuerProfile.swr')));

const NewsFeedWorkspace = Loadable(
  lazy(() => import('./pages/dashboard/manager/news-feed/NewsFeedWorkspace.swr'))
);

const NewsFeed = Loadable(lazy(() => import('./pages/dashboard/news-feed/NewsFeed.swr')));

// Error pages
const AuthorizationRequired = Loadable(lazy(() => import('./pages/AuthorizationRequired')));
const NotFound = Loadable(lazy(() => import('./pages/NotFound')));
const ServerError = Loadable(lazy(() => import('./pages/ServerError')));

//  Confirmation  pages
const PasswordRecoveryLinkSent = Loadable(lazy(() => import('./pages/PasswordRecoveryLinkSent')));
const EmailConfirmationSent = Loadable(lazy(() => import('./pages/EmailConfirmationSent')));
const EmailVerification = Loadable(lazy(() => import('./pages/EmailVerification')));

const routes: RouteObject[] = [
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        ),
      },
      {
        path: 'password-recovery',
        element: <PasswordRecovery />,
      },
      {
        path: 'password-recovery-link-sent',
        element: <PasswordRecoveryLinkSent />,
      },
      {
        path: 'register',
        element: (
          <GuestGuard>
            <Register />
          </GuestGuard>
        ),
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'overview',
        element: <Overview />,
      },
      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'issuers-workspace',
        element: (
          <UserRoleGuard roles={['ADMIN', 'ACCOUNT_MANAGER']}>
            <IssuerWorkspace />
          </UserRoleGuard>
        ),
      },
      {
        path: 'issuers-workspace/:userId',
        element: (
          <UserRoleGuard roles={['ADMIN', 'ACCOUNT_MANAGER']}>
            <IssuerOnboardProfile />
          </UserRoleGuard>
        ),
      },
      {
        path: 'company-profile',
        element: (
          <UserRoleGuard roles={['USER']}>
            <IssuerProfile />
          </UserRoleGuard>
        ),
      },
      {
        path: 'news-feed-workspace',
        element: (
          <UserRoleGuard roles={['ADMIN', 'ACCOUNT_MANAGER']}>
            <NewsFeedWorkspace />
          </UserRoleGuard>
        ),
      },
      {
        path: 'news-feed',
        element: (
          <UserRoleGuard roles={['ADMIN', 'ACCOUNT_MANAGER']}>
            <NewsFeed />
          </UserRoleGuard>
        ),
      }
    ],
  },
  {
    path: '*',
    children: [
      {
        path: 'dashboard',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '401',
        element: <AuthorizationRequired />,
      },
      {
        path: '404',
        element: <NotFound />,
      },
      {
        path: '500',
        element: <ServerError />,
      },
      {
        path: 'email-confirmation-sent',
        element: <EmailConfirmationSent />,
      },
      {
        path: 'email-confirmation',
        element: <EmailVerification />,
      },
      {
        path: 'reset-password',
        element: <PasswordReset />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export const getRouteName = (currentRoute: string): string => {
  const routeNames = [
    { regex: /^\/dashboard$/, name: 'Overview' },
    { regex: /^\/dashboard\/account$/, name: 'Your account' },
    { regex: /^\/dashboard\/issuers-workspace$/, name: 'Issuers Workspace' },
    { regex: /^\/dashboard\/issuers-workspace\/\d+$/, name: 'Issuer Onboarding Profile' },
    { regex: /^\/dashboard\/investors-workspace$/, name: 'Investors Workspace' },
    { regex: /^\/dashboard\/investors-workspace\/\d+$/, name: 'Investor Onboarding Profile' },
    {
      regex: /^\/dashboard\/investors-workspace\/\d+\/investment\/\d+$/,
      name: 'Investment Details',
    },
    { regex: /^\/dashboard\/campaigns-workspace$/, name: 'Campaigns Workspace' },
    { regex: /^\/dashboard\/campaigns-workspace\/\d+$/, name: 'Campaign Details' },
    { regex: /^\/dashboard\/projects-workspace$/, name: 'Projects Workspace' },
    { regex: /^\/dashboard\/investments-workspace$/, name: 'Investments Workspace' },
    { regex: /^\/dashboard\/investments-workspace\/\d+$/, name: 'Investment Details' },
    { regex: /^\/dashboard\/crowdfunding-campaign$/, name: 'Start a campaign' },
    { regex: /^\/dashboard\/company-profile$/, name: 'Company profile' },
    { regex: /^\/dashboard\/investor-profile$/, name: 'Investor Profile' },
    { regex: /^\/dashboard\/investor-investments$/, name: 'My Investments' },
    { regex: /^\/dashboard\/investor-investments\/\d+$/, name: 'Investment Details' },
    { regex: /^\/dashboard\/investor-campaign\/\d+$/, name: 'Crowdfunding Campaign' },
    { regex: /^\/dashboard\/investor-campaign-workspace\/\d+$/, name: 'Crowdfunding Campaign' },
    { regex: /^\/dashboard\/investment-wizard\/\d+$/, name: 'Investment Wizard' },
    { regex: /^\/dashboard\/presubscribe\/\d+$/, name: 'Presubscribe to Campaign' },
    { regex: /^\/dashboard\/investment-wizard\/finish$/, name: 'Investment Wizard' },
    { regex: /^\/dashboard\/news-feed-workspace$/, name: 'News Feed Workspace' },
    { regex: /^\/dashboard\/news-feed$/, name: 'News Feed' },
  ];
  for (const route of routeNames) {
    if (route.regex.test(currentRoute)) return route.name;
  }
  return null;
};

export default routes;
