import { Box } from '@mui/material';
import { CampaignQaTextEditor } from './campaign-qa-text-editor';

import type { FC } from 'react';
import { Campaign } from 'types/campaign';

export interface CampaignQaTabProps {
  campaignData: Partial<Campaign>;
  readonly: boolean;
}

export const CampaignQaTab: FC<CampaignQaTabProps> = (props: CampaignQaTabProps): JSX.Element => {
  const { readonly, campaignData } = props;
  return (
    <Box>
      <CampaignQaTextEditor readonly={readonly} campaignData={campaignData} />
    </Box>
  );
};
