import { Box, Grid, Link, Typography } from '@mui/material';
import { Spacer } from 'components/Spacer';
import { useTranslation } from 'react-i18next';

const ManagerOverview = (): JSX.Element => {
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
        <Typography color="textPrimary" variant="h4">
          {t('managerOverview.welcome')}
        </Typography>
        <Spacer marginTop="16px" marginBottom="16px" />
        <Typography color="textPrimary" variant="h6">
          {t('managerOverview.pleaseCheck')}
          <Link href="/dashboard/investors-workspace">{t('managerOverview.investors')}</Link>,{' '}
          <Link href="/dashboard/issuers-workspace">{t('managerOverview.issuers')}</Link>{' '}
          {t('managerOverview.and')}{' '}
          <Link href="/dashboard/campaigns-workspace">{t('managerOverview.projects')}</Link>{' '}
          {t('managerOverview.section')}
          <Link href="/dashboard/investments-workspace">
            {' '}
            {t('managerOverview.investments')}
          </Link>{' '}
          {t('managerOverview.andLatestUpdates')}
        </Typography>
      </Grid>
    </Box>
  );
};

export default ManagerOverview;
