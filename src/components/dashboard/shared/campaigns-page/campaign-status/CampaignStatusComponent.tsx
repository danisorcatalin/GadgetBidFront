import { Typography, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { getCampaignStatusColor } from 'utils/user';

import type { FC } from 'react';
import { CampaignStatus } from 'types/campaign';
import { useTranslation } from 'react-i18next';

export interface CampaignStatusProps {
  status: CampaignStatus;
  className?: string;
}

export const CampaignStatusComponent: FC<CampaignStatusProps> = (
  props: CampaignStatusProps
): JSX.Element => {
  const { status, className } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box className={className}>
      <Typography variant="button" marginRight={1}>
        {t('campaign.status')}:
      </Typography>
      <Button
        style={{ color: getCampaignStatusColor(status, theme) }}
        size="large"
        variant="outlined"
      >
        {status}
      </Button>
    </Box>
  );
};
