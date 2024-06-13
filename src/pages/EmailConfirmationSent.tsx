import gtm from '../lib/gtm';
import type { FC } from 'react';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { GTM_EVENTS } from '../constants';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from 'components/Logo';
import { Link as RouterLink } from 'react-router-dom';
import { responsive } from 'theme';

const EmailConfirmationSentPage: FC = () => {
  const { t } = useTranslation();
  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Email Confirmation' });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('pages.emailConfirmation')} | Gadget Bid</title>
      </Helmet>
      <Box sx={{ backgroundColor: 'primary.main', minHeight: '100%' }}>
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
            px: 3,
            ...responsive.publicPage,
          }}
        >
          <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ height: '656px', maxWidth: '688px', flexGrow: 1 }}>
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
                    {t('pages.checkInbox')}
                  </Typography>
                  <Typography align="center" color="textSecondary" sx={{ mt: 0.5 }} variant="h3">
                    {t('pages.sentEmailConfirmation')}
                  </Typography>
                </Box>
                <Box>
                  <Box
                    sx={{
                      width: '265px',
                      height: '89px',
                      backgroundColor: 'primary.main',
                      borderRadius: '4px',
                      ml: 2,
                      mb: 10,
                    }}
                  />

                  <Box
                    sx={{
                      width: '100px',
                      height: '50px',
                      borderTopLeftRadius: '150px',
                      borderTopRightRadius: '150px',
                      border: '85px solid black',
                      borderBottom: '0',
                      boxSizing: 'content-box',
                      mb: -3,
                      ml: 2,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default EmailConfirmationSentPage;
