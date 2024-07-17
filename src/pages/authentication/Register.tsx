import Logo from '../../components/Logo';
import gtm from '../../lib/gtm';
import type { FC } from 'react';
import useAuth from '../../hooks/useAuth';
import { AuthContextValue } from 'contexts/JWTContext';
import { Box, Card, CardContent, Container, Divider, Link, Typography } from '@mui/material';
import { GTM_EVENTS } from '../../constants';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { RegisterJWT } from '../../components/authentication/register';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { responsive } from 'theme';

const Register: FC = () => {
  const { platform } = useAuth() as AuthContextValue;
  const { t } = useTranslation();

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Register' });
  }, []);

  const haveAnAccountEventClick = (): void => {
    gtm.push({ event: GTM_EVENTS.HAVING_AN_ACCOUNT_CLICK });
  };

  // @ts-ignore
  return (
    <>
      <Helmet>
        <title>{t('register.pageTitle')} | Gadget Bid</title>
      </Helmet>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <RouterLink to="dashboard">
          <Logo
            sx={{
              height: 150,
              width: 200,
            }}
          />
        </RouterLink>
      </Box>
      {/* <AuthBanner /> */}
      <Container sx={{ ...responsive.publicPage, maxWidth: '688px !important' }}>
        <Card>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 0,
              backgroundColor: '#F4F6FF',
            }}
          >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                p: 2,
                backgroundColor: 'background.paper',
              }}
            >
              <div>
                <Typography
                  sx={{
                    color: '#000000',
                    letterSpacing: '-0.88px',
                    textAlign: 'left',
                    mb: 1,
                  }}
                  gutterBottom
                  variant="h1"
                >
                  {t('register.pageTitle')}
                </Typography>
                <Typography
                  sx={{
                    color: '#000000',
                    fontSize: '16.5px !important',
                    letterSpacing: '-0.33px',
                    textAlign: 'left',
                  }}
                >
                  {t('register.subtitle')}
                </Typography>
              </div>
              <Box
                sx={{
                  height: 32,
                  '& > img': {
                    maxHeight: '100%',
                    width: 'auto',
                  },
                }}
              ></Box>
            </Box>
            <Box sx={{ p: 2 }}>{platform === 'JWT' && <RegisterJWT />}</Box>
            <Box sx={{ px: 2 }}>
              <Divider sx={{ mt: 2, mb: 3, px: 2 }} />
              <Link
                underline="hover"
                component={RouterLink}
                sx={{ color: '#000000' }}
                to="/authentication/login"
                variant="h2"
                onClick={haveAnAccountEventClick}
              >
                {t('register.haveAnAccount')}
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Register;
