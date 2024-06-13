import gtm from '../lib/gtm';
import type { FC } from 'react';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import { EmailVerificationStatus } from '../types/auth';
import { GTM_EVENTS, Routes } from '../constants';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery, useAuth } from '../hooks';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import Logo from 'components/Logo';
import { responsive } from 'theme';

const EmailVerificationPage: FC = () => {
  const query = useQuery();
  const { verifyEmail, emailVerificationStatus } = useAuth();
  const [emailConfirmed, setEmailConfirmed] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  useEffect(() => {
    const token = query.get('token');
    verifyEmail({ token });
  }, []);

  useEffect(() => {
    if (emailVerificationStatus === EmailVerificationStatus.CONFIRMED) {
      setEmailConfirmed(true);
      enqueueSnackbar(t('pages.emailConfirmed'), {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
        variant: 'success',
      });
    } else if (emailVerificationStatus === EmailVerificationStatus.FAILED) {
      setEmailConfirmed(false);
      enqueueSnackbar(t('pages.verificationFailed'), {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
        variant: 'error',
      });
    }
  }, [emailVerificationStatus, enqueueSnackbar]);

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Email Verification' });
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
                  <Typography align="center" color="textPrimary" variant={'h1'}>
                    {emailConfirmed === null && t('pages.waitingForVerification')}
                    {emailConfirmed === true && t('pages.emailSuccessfullyVerified')}
                    {emailConfirmed === false && t('pages.verificationFailed')}
                  </Typography>
                  <Typography align="center" color="textPrimary" sx={{ mt: 0.5 }} variant="h3">
                    {emailConfirmed === true && t('pages.youCanNowLogIn')}
                    {emailConfirmed === false && t('pages.pleaseTryAgain')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 6,
                    p: 2,
                    mb: -2,
                  }}
                >
                  <Button
                    color="primary"
                    component={RouterLink}
                    to={Routes.LoginPage}
                    variant="contained"
                    fullWidth
                  >
                    {t('pages.goToLogin')}
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

export default EmailVerificationPage;
