import gtm from '../lib/gtm';
import type { FC } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Container, Typography } from '@mui/material';
import { GTM_EVENTS } from '../constants';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { responsive } from 'theme';

const PasswordRecoveryLinkSentPage: FC = () => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('xl'));
  const { t } = useTranslation();

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Password Recovery' });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('passwordRecovery.pageTitle')} | GadgetBid</title>
      </Helmet>
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'background.paper',
          display: 'flex',
          minHeight: '100%',
          px: 3,
          ...responsive.publicPage,
        }}
      >
        <Container maxWidth="lg">
          <Typography align="center" color="textPrimary" variant={mobileDevice ? 'h4' : 'h1'}>
            {t('passwordRecovery.checkInbox')}
          </Typography>
          <Typography align="center" color="textSecondary" sx={{ mt: 0.5 }} variant="subtitle2">
            {t('passwordRecovery.emailPasswordResetSent')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          >
            <Box
              alt={t('pages.underDevelopment')}
              component="img"
              src={`/static/error/error401_${theme.palette.mode}.svg`}
              sx={{
                height: 'auto',
                maxHeight: 200,
                maxWidth: '100%',
                width: 400,
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          ></Box>
        </Container>
      </Box>
    </>
  );
};

export default PasswordRecoveryLinkSentPage;
