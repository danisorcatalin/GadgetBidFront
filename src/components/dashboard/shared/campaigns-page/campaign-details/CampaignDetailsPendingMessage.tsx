import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const CampaignDetailsPendingMessage = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        p: 3,
        borderRadius: '10px',
      }}
    >
      <Grid container flexDirection="column">
        <Typography color="textPrimary" variant="body2">
          {t('campaign.details.firstMessage')}
        </Typography>
        <Typography color="textPrimary" variant="body2">
          {t('campaign.details.secondMessage')}
        </Typography>
        <Typography color="textPrimary" variant="body2">
          {t('campaign.details.thirdMessage')}
        </Typography>
      </Grid>
    </Box>
  );
};
