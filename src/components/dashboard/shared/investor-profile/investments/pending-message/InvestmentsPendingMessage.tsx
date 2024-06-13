import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const InvestmentsPendingMessage = (): JSX.Element => {
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
          {t('investPendingMessage.makeSomeInvestments')}
        </Typography>
      </Grid>
    </Box>
  );
};
