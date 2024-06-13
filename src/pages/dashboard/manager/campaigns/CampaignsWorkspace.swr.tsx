import { CampaignsPage } from 'components/dashboard/shared/campaigns-page';
import { withErrorSuspense } from 'utils/withErrorSuspense';

import { FC, useEffect } from 'react';
import { useGetCampaignsList } from 'api';
import gtm from '../../../../lib/gtm';
import { GTM_EVENTS } from '../../../../constants';

const CampaignsWorkspace: FC = () => {
  const { data: campaignsData } = useGetCampaignsList();
  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Campaigns Workspace' });
  }, []);

  return <CampaignsPage campaignsData={campaignsData} />;
};

export default withErrorSuspense(CampaignsWorkspace);
