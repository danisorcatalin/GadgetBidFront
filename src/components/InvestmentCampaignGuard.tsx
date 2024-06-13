import { useGetCampaignStatusById } from 'api/hooks/useGetCampaignStatusbyId';
import type { FC, ReactNode } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { CampaignStatus } from 'types/campaign';
import { withErrorSuspense } from 'utils/withErrorSuspense';

interface InvestmentCampaignGuardProps {
  status: CampaignStatus;
  children: ReactNode;
}

const InvestmentCampaignGuard: FC<InvestmentCampaignGuardProps> = (props) => {
  const { status, children } = props;
  const { campaignId } = useParams();
  const { data: campaignData } = useGetCampaignStatusById(+campaignId);
  if (campaignData.status !== status) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default withErrorSuspense(InvestmentCampaignGuard);
