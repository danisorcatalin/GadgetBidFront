import { Suspense, lazy } from 'react';
import type { PartialRouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import AuthGuard from './components/AuthGuard';
import GuestGuard from './components/GuestGuard';
import UserRoleGuard from './components/UserRoleGuard';
import LoadingScreen from './components/LoadingScreen';
import DashboardLayout from './components/dashboard/DashboardLayout';
import InvestmentCampaignGuard from 'components/InvestmentCampaignGuard';
import InvestmentCampaignDetailsPreviewGuard from 'components/InvestmentCampaignDetailsPreviewGuard';

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
const InvestorWorkspace = Loadable(
  lazy(() => import('./pages/dashboard/manager/investors/InvestorsWorkspace.swr'))
);

const InvestorOnboardProfile = Loadable(
  lazy(() => import('./pages/dashboard/manager/investors/InvestorProfileWorkspace.swr'))
);

const CampaignDetails = Loadable(
  lazy(() => import('./pages/dashboard/issuer/CampaignDetails.swr'))
);
const IssuerWorkspace = Loadable(
  lazy(() => import('./pages/dashboard/manager/issuers/IssuersWorkspace.swr'))
);
const IssuerOnboardProfile = Loadable(
  lazy(() => import('./pages/dashboard/manager/issuers/IssuerProfileWorkspace.swr'))
);

const CampaignsWorkspace = Loadable(
  lazy(() => import('./pages/dashboard/manager/campaigns/CampaignsWorkspace.swr'))
);

const CampaignDetailsWorkspace = Loadable(
  lazy(() => import('./pages/dashboard/manager/campaigns/CampaignDetailsWorkspace.swr'))
);

const InvestmentsWorkspace = Loadable(
  lazy(() => import('./pages/dashboard/manager/investments/InvestmentsWorkspace.swr'))
);

const IssuerProfile = Loadable(lazy(() => import('./pages/dashboard/issuer/IssuerProfile.swr')));
const InvestorProfile = Loadable(
  lazy(() => import('./pages/dashboard/investor/InvestorProfile.swr'))
);

const InvestorInvestments = Loadable(
  lazy(() => import('./pages/dashboard/investor/InvestorInvestments.swr'))
);

const InvestorInvestmentDetails = Loadable(
  lazy(() => import('./pages/dashboard/investor/InvestorInvestmentDetails.swr'))
);

const InvestorInvestmentDetailsWorkspace = Loadable(
  lazy(() => import('./pages/dashboard/manager/investments/InvestorInvestmentDetailsWorkspace.swr'))
);

const InvestmentCampaignDetails = Loadable(
  lazy(() => import('./pages/dashboard/investor/InvestmentCampaignDetails.swr'))
);

const InvestmentCampaignDetailsWorkspace = Loadable(
  lazy(() => import('./pages/dashboard/manager/investments/InvestmentCampaignDetailsWorkspace.swr'))
);

const Presubscribe = Loadable(lazy(() => import('./pages/dashboard/investor/Presubscribe.swr')));

const InvestmentWizard = Loadable(
  lazy(() => import('./pages/dashboard/investor/InvestmentWizard.swr'))
);

const InvestmentWizardFinish = Loadable(
  lazy(() => import('./pages/dashboard/investor/InvestmentWizardFinish.swr'))
);

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

const routes: PartialRouteObject[] = [
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
        path: '/',
        element: <Overview />,
      },
      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'investors-workspace',
        element: (
          <UserRoleGuard roles={['ADMIN', 'ACCOUNT_MANAGER']}>
            <InvestorWorkspace />
          </UserRoleGuard>
        ),
      },
      {
        path: 'investors-workspace/:userId',
        element: (
          <UserRoleGuard roles={['ADMIN', 'ACCOUNT_MANAGER']}>
            <InvestorOnboardProfile />
          </UserRoleGuard>
        ),
      },
      {
        path: 'investors-workspace/:userId/investment/:id',
        element: (
          <UserRoleGuard roles={['ADMIN', 'ACCOUNT_MANAGER']}>
            <InvestorInvestmentDetails />
          </UserRoleGuard>
        ),
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
        path: 'campaigns-workspace',
        element: (
          <UserRoleGuard roles={['ADMIN', 'ACCOUNT_MANAGER']}>
            <CampaignsWorkspace />
          </UserRoleGuard>
        ),
      },
      {
        path: 'campaigns-workspace/:campaignId',
        element: (
          <UserRoleGuard roles={['ADMIN', 'ACCOUNT_MANAGER']}>
            <CampaignDetailsWorkspace />
          </UserRoleGuard>
        ),
      },
      {
        path: 'investments-workspace',
        element: (
          <UserRoleGuard roles={['ADMIN', 'ACCOUNT_MANAGER']}>
            <InvestmentsWorkspace />
          </UserRoleGuard>
        ),
      },
      {
        path: 'investments-workspace/:investmentId',
        element: (
          <UserRoleGuard roles={['ADMIN', 'ACCOUNT_MANAGER']}>
            <InvestorInvestmentDetailsWorkspace />
          </UserRoleGuard>
        ),
      },
      {
        path: 'crowdfunding-campaign',
        element: <UserRoleGuard roles={['ADMIN', 'ISSUER']}>{<CampaignDetails />}</UserRoleGuard>,
      },
      {
        path: 'crowdfunding-campaign/:campaignId',
        element: <UserRoleGuard roles={['ADMIN', 'ISSUER']}>{<CampaignDetails />}</UserRoleGuard>,
      },
      {
        path: 'company-profile',
        element: (
          <UserRoleGuard roles={['ISSUER']}>
            <IssuerProfile />
          </UserRoleGuard>
        ),
      },
      {
        path: 'investor-profile',
        element: (
          <UserRoleGuard roles={['INVESTOR']}>
            <InvestorProfile />
          </UserRoleGuard>
        ),
      },
      {
        path: 'investor-investments',
        element: (
          <UserRoleGuard roles={['INVESTOR']}>
            <InvestorInvestments />
          </UserRoleGuard>
        ),
      },
      {
        path: 'presubscribe/:campaignId',
        element: (
          <UserRoleGuard roles={['INVESTOR', 'ADMIN']}>
            <InvestmentCampaignGuard status={'AUDIT_DONE'}>
              <Presubscribe />
            </InvestmentCampaignGuard>
          </UserRoleGuard>
        ),
      },
      {
        path: 'investment-wizard/:campaignId',
        element: (
          <UserRoleGuard roles={['INVESTOR', 'ADMIN']}>
            <InvestmentCampaignGuard status={'LISTED'}>
              <InvestmentWizard />
            </InvestmentCampaignGuard>
          </UserRoleGuard>
        ),
      },
      {
        path: 'investment-wizard/finish',
        element: (
          <UserRoleGuard roles={['INVESTOR', 'ADMIN']}>
            <InvestmentWizardFinish />
          </UserRoleGuard>
        ),
      },
      {
        path: 'investor-investments/:investmentId',
        element: (
          <UserRoleGuard roles={['ADMIN', 'ACCOUNT_MANAGER', 'INVESTOR']}>
            <InvestorInvestmentDetails />
          </UserRoleGuard>
        ),
      },
      {
        path: 'investor-campaign/:campaignId',
        element: (
          <UserRoleGuard roles={['INVESTOR', 'ISSUER', 'ADMIN', 'ACCOUNT_MANAGER']}>
            <InvestmentCampaignDetailsPreviewGuard>
              <InvestmentCampaignDetails />
            </InvestmentCampaignDetailsPreviewGuard>
          </UserRoleGuard>
        ),
      },
      {
        path: 'investor-campaign-workspace/:campaignId',
        element: (
          <UserRoleGuard roles={['ADMIN', 'ACCOUNT_MANAGER']}>
            <InvestmentCampaignDetailsWorkspace />
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
          <UserRoleGuard roles={['INVESTOR', 'ISSUER']}>
            <NewsFeed />
          </UserRoleGuard>
        ),
      },
    ],
  },
  {
    path: '*',
    children: [
      {
        path: '/',
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
