import { FC } from 'react';
import { CampaignsListingTable } from './campaigns-listing-table/CampaignsListingTable';
import { NewCampaign } from 'types/campaign';

interface CampaignsPageProps {
  campaignsData: NewCampaign[];
}

export const CampaignsPage: FC<CampaignsPageProps> = (props: CampaignsPageProps) => {
  const { campaignsData = [] } = props;
  return <CampaignsListingTable campaigns={campaignsData} />;
};
