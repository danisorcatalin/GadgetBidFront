import { FC } from 'react';
import { InvestmentCampaignDetails } from 'components/dashboard/shared/investor-profile/investment-campaigns/campaign/campaign-details';
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
  const { data: campaignData } = useGetCampaignById(+campaignId);
  const { data: campaignFiles } = useGetCampaignFilesById(+campaignId);
  const { data: campaignMembers } = useGetCampaignMembersById(+campaignId);
  const { user: campaignUserData } = campaignData;
  const { data: userData } = useGetUserById(campaignUserData.id);
  const { data: userOnboarding } = useGetUserOnboardById(userData?.onboard?.id);
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
