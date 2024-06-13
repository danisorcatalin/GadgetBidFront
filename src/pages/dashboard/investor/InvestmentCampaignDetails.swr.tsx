import gtm from '../../../lib/gtm';
import { FC, useEffect } from 'react';
import { GTM_EVENTS } from '../../../constants';
import { InvestmentCampaignDetails } from 'components/dashboard/shared/investor-profile/investment-campaigns/campaign/campaign-details';
import { useAuth } from 'hooks';
import {
  useGetCampaignById,
  useGetCampaignFilesById,
  useGetCampaignMembersById,
  useGetUserById,
  useGetUserOnboardById,
} from 'api';
import { useParams } from 'react-router-dom';
import { withErrorSuspense } from 'utils/withErrorSuspense';

const InvestmentCampaignDetailsPage: FC = () => {
  const { campaignId } = useParams();
  const {
    user: { id: userId },
  } = useAuth();
  const { data: userData } = useGetUserById(userId);
  const { data: userOnboarding } = useGetUserOnboardById(userData?.onboard?.id);
  const { data: campaignData } = useGetCampaignById(+campaignId);
  const { data: campaignFiles } = useGetCampaignFilesById(+campaignId);
  const { data: campaignMembers } = useGetCampaignMembersById(+campaignId);

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Investment Campaign Details' });
  }, []);

  return (
    <InvestmentCampaignDetails
      userOnboardStatus={userOnboarding?.status}
      campaignData={campaignData}
      campaignFiles={campaignFiles}
      campaignMembers={campaignMembers}
    />
  );
};

export default withErrorSuspense(InvestmentCampaignDetailsPage);
