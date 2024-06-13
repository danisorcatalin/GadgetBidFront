import gtm from '../lib/gtm';
import type { FC } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Button, Container, Typography } from '@mui/material';
import { GTM_EVENTS } from '../constants';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { responsive } from 'theme';

const ServerError: FC = () => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('xl'));
  const { t } = useTranslation();
  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Server Error' });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('pages.serverError')}</title>
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
            {t('pages.internalServerError')}
          </Typography>
          <Typography align="center" color="textSecondary" sx={{ mt: 0.5 }} variant="subtitle2">
            {t('pages.mistake')}
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
              src={`/static/error/error500_${theme.palette.mode}.svg`}
              sx={{
                height: 'auto',
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
          >
            <Button color="primary" component={RouterLink} to="/" variant="outlined">
              {t('pages.backToHome')}
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ServerError;
