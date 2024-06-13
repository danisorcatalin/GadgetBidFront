import { Box } from '@mui/material';

import type { FC } from 'react';
import { Campaign, CampaignFile } from 'types/campaign';
import { CampaignDocumentsTable } from './campaign-documents-table/CampaignDocumentsTable';

export interface CampaignDocumentsTabProps {
  campaignData: Partial<Campaign>;
  campaignFiles: CampaignFile[];
  readonly: boolean;
  useAuthHook?: unknown;
}

export const CampaignDocumentsTab: FC<CampaignDocumentsTabProps> = (
  props: CampaignDocumentsTabProps
): JSX.Element => {
  const { campaignData, campaignFiles, readonly, useAuthHook } = props;
  return (
    <Box>
      <CampaignDocumentsTable
        campaignData={campaignData}
        campaignFiles={campaignFiles}
        readonly={readonly}
        useAuthHook={useAuthHook}
      />
    </Box>
  );
};
