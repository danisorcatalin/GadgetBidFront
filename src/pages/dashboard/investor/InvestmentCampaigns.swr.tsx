import { Box } from '@mui/material';
import { useGetCampaignsList } from 'api';
import { InvestmentCampaigns } from 'components/dashboard/shared/investor-profile/investment-campaigns/InvestmentCampaigns';
import { InvestPendingMessage } from 'components/dashboard/shared/investor-profile/investment-campaigns/pending-message';
import { FC } from 'react';

const InvestmentCampaignsPage: FC = () => {
  const { data: campaignsList } = useGetCampaignsList();
  return (
    <Box style={{ padding: 0 }}>
      {campaignsList.length ? (
        <InvestmentCampaigns campaignsList={campaignsList} />
      ) : (
        <InvestPendingMessage />
      )}
    </Box>
  );
};

export default InvestmentCampaignsPage;
