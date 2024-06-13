import InvestmentCampaignsPage from './investor/InvestmentCampaigns.swr';
import IssuerOverview from 'components/dashboard/IssuerOverview';
import ManagerOverview from 'components/dashboard/ManagerOverview';
import gtm from '../../lib/gtm';
import type { FC } from 'react';
import { GTM_EVENTS } from '../../constants';
import { UserRole } from 'types/user';
import { useAuth } from 'hooks';
import { useEffect } from 'react';
import { useGetUserById, useGetUserOnboardById } from 'api';

const Overview: FC = () => {
  const {
    user: { role: currentUserRole, id: currentUserId },
  } = useAuth();
  const { data: userData } = useGetUserById(currentUserId);
  const { data: userOnboard } = useGetUserOnboardById(userData?.onboard?.id);

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Overview' });
  }, []);

  const renderOverviewContent = (role: UserRole): JSX.Element => {
    let component: JSX.Element;
    switch (role) {
      case 'INVESTOR':
        component = <InvestmentCampaignsPage />;
        break;
      case 'ISSUER':
        component = <IssuerOverview status={userOnboard.status} />;
        break;
      case 'ACCOUNT_MANAGER':
      case 'ADMIN':
        component = <ManagerOverview />;
        break;
      default:
        component = <div></div>;
        break;
    }
    return component;
  };

  return renderOverviewContent(currentUserRole);
};

export default Overview;
