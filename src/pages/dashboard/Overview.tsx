import IssuerOverview from 'components/dashboard/IssuerOverview';
import ManagerOverview from 'components/dashboard/ManagerOverview';
import gtm from '../../lib/gtm';
import type { FC } from 'react';
import { GTM_EVENTS } from '../../constants';
import { UserRole } from 'types/user';
import { useAuth } from 'hooks';
import { useEffect } from 'react';

const Overview: FC = () => {
  const {
    user: { role: currentUserRole },
  } = useAuth();

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Overview' });
  }, []);

  const renderOverviewContent = (role: UserRole): JSX.Element => {
    let component: JSX.Element;
    switch (role) {
      case 'USER':
        component = <IssuerOverview/>;
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
