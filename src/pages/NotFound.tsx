import gtm from '../lib/gtm';
import type { FC } from 'react';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import { GTM_EVENTS } from '../constants';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from 'components/Logo';
import { responsive } from 'theme';

const NotFound: FC = () => {
  const { t } = useTranslation();
  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Not Found' });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('pages.notFoundError')}</title>
      </Helmet>
      <Box sx={{ backgroundColor: 'black', minHeight: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <RouterLink to="/">
            <Logo
              sx={{
                height: 50,
                width: 100,
              }}
              white={true}
            />
          </RouterLink>
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            minHeight: '100%',
            px: 3,
            ...responsive.publicPage,
          }}
        >
          <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ height: '552px', maxWidth: '656px', flexGrow: 1 }}>
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  p: 0,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    backgroundColor: 'background.paper',
                    p: 2,
                  }}
                >
                  <Typography align="center" color="textPrimary" variant="h1">
                    404
                  </Typography>
                  <Typography align="center" color="textPrimary" variant="h3">
                    {t('pages.pageIsNotHere')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: '100%',
                    p: 2,
                  }}
                >
                  <Typography align="center" color="textPrimary" sx={{ mt: 0.5 }} variant="h2">
                    {t('pages.mistake')}
                  </Typography>
                  <Typography align="center" color="textPrimary" sx={{ mt: 0.5 }} variant="h2">
                    {t('pages.mistakeSubtitle')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 2,
                    mb: -1,
                  }}
                >
                  <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    component={RouterLink}
                    to="/"
                  >
                    {t('pages.backToHome')}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default NotFound;
