import { useGetCampaignStatusById } from 'api/hooks/useGetCampaignStatusbyId';
import { useGetUserCampaignsByUserId } from 'api/hooks/useGetUserCampaignsByUserId';
import { useAuth } from 'hooks';
import type { FC, ReactNode } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { CampaignStatus } from 'types/campaign';
import { endedCampaignStatuses } from 'utils/user';
import { withErrorSuspense } from 'utils/withErrorSuspense';

interface InvestmentCampaignDetailsPreviewGuardProps {
  children: ReactNode;
}

const InvestmentCampaignDetailsPreviewGuard: FC<InvestmentCampaignDetailsPreviewGuardProps> = (
  props
) => {
  const { children } = props;
  const { campaignId } = useParams();
  const {
    user: { role: currentUserRole, id: currentUserId },
  } = useAuth();
  const { data: userCampaigns } = useGetUserCampaignsByUserId(currentUserId);
  const { data: campaignData } = useGetCampaignStatusById(+campaignId);
  const userCampaign = userCampaigns.find((campaign) => campaign.id === +campaignId);
  const validInvestorCampaignStatuses: CampaignStatus[] = [
    ...endedCampaignStatuses,
    'LISTED',
    'AUDIT_DONE',
  ];

  if (currentUserRole === 'ISSUER' && userCampaign?.status !== 'IN_PROGRESS') {
    return <Navigate to="/dashboard" />;
  }

  if (
    currentUserRole === 'INVESTOR' &&
    !validInvestorCampaignStatuses.includes(campaignData?.status)
  ) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default withErrorSuspense(InvestmentCampaignDetailsPreviewGuard);
