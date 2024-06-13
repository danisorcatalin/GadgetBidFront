import { Box } from '@mui/material';

import type { FC } from 'react';
import { Campaign } from 'types/campaign';
import { CampaignRisksTextEditor } from './campaign-risks-text-editor/CampaignRisksTextEditor';

export interface CampaignRisksTabProps {
  readonly: boolean;
  campaignData: Partial<Campaign>;
}

export const CampaignRisksTab: FC<CampaignRisksTabProps> = (
  props: CampaignRisksTabProps
): JSX.Element => {
  const { readonly, campaignData } = props;
  return (
    <Box>
      <CampaignRisksTextEditor readonly={readonly} campaignData={campaignData} />
    </Box>
  );
};
