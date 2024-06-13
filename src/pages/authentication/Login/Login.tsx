import gtm from '../../../lib/gtm';
import type { FC } from 'react';
import useAuth from '../../../hooks/useAuth';
import { AuthContextValue } from 'contexts/JWTContext';
import { Box, Card, CardContent, Container, Divider, Link, Typography } from '@mui/material';
import { GTM_EVENTS } from '../../../constants';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { LoginJWT } from '../../../components/authentication/login';
import { formatPageTitle } from 'utils/utils';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from 'components/Logo';
import { responsive } from 'theme';

const Login: FC = () => {
  const { t } = useTranslation();
  const { platform } = useAuth() as AuthContextValue;

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Login' });
  }, []);

  const newAccountEventClick = (): void => {
    gtm.push({ event: GTM_EVENTS.CREATE_NEW_ACCOUNT_CLICK });
  };

  const forgotPasswordEventClick = (): void => {
    gtm.push({ event: GTM_EVENTS.FORGOT_PASSWORD_CLICK });
  };

  return (
    <>
      <Helmet>
        <title>{formatPageTitle(t('login.pageTitle'))}</title>
      </Helmet>
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
          />
        </RouterLink>
      </Box>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* <AuthBanner /> */}
        <Container
          maxWidth="sm"
          sx={{ ...responsive.publicPage, display: 'flex', justifyContent: 'center' }}
        >
          <Card sx={{ maxWidth: '352px' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 0,
                backgroundColor: '#EBF0FF',
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
                    }}
                    gutterBottom
                    variant="h1"
                  >
                    {t('login.title')}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#000000',
                      fontSize: '16.5px !important',
                      letterSpacing: '-0.33px',
                      textAlign: 'left',
                    }}
                  >
                    {t('login.subtitle')}
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
              <Box
                sx={{
                  flexGrow: 1,
                  p: 2,
                }}
              >
                {platform === 'JWT' && <LoginJWT />}
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  px: 2,
                }}
              >
                <Divider variant="middle" sx={{ mx: 0, my: 2, backgroundColor: 'primary.main' }} />
                <Link
                  sx={{ mb: 0.5, mt: 1.4, color: '#000000' }}
                  underline="hover"
                  component={RouterLink}
                  to="/authentication/register"
                  variant="h2"
                  onClick={newAccountEventClick}
                >
                  {t('login.newAccount')}
                </Link>
                <Link
                  underline="hover"
                  component={RouterLink}
                  sx={{ color: '#000000' }}
                  to="/authentication/password-recovery"
                  variant="h2"
                  onClick={forgotPasswordEventClick}
                >
                  {t('login.forgotPassword')}
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
