import Logo from '../../components/Logo';
import gtm from '../../lib/gtm';
import type { FC } from 'react';
import useAuth from '../../hooks/useAuth';
import { AuthContextValue } from 'contexts/JWTContext';
import { Box, Card, CardContent, Container, Divider, Link, Typography } from '@mui/material';
import { GTM_EVENTS } from '../../constants';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { PasswordResetForm } from '../../components/authentication/password-reset';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PasswordReset: FC = () => {
  const { platform } = useAuth() as AuthContextValue;
  const { t } = useTranslation();

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Password Reset' });
  }, []);

  return (
    <>
      <Helmet>
        <title> {t('passwordReset.pageTitle')} | Gadget Bid</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="sm" sx={{ py: 10 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
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
              display: 'flex',
              justifyContent: 'center',
              mb: 8,
            }}
          />
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 4,
              }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3,
                }}
              >
                <div>
                  <Typography color="textPrimary" gutterBottom variant="h4">
                    {t('passwordReset.pageTitle')}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    {t('passwordReset.subtitle')}
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
                  mt: 3,
                }}
              >
                <PasswordResetForm />
              </Box>
              <Divider sx={{ my: 3 }} />
              {platform !== 'JWT' && platform === 'Amplify' && (
                <Link
                  color="textSecondary"
                  component={RouterLink}
                  to="/authentication/password-recovery"
                  variant="body2"
                >
                  {t('passwordReset.receiveError')}
                </Link>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default PasswordReset;
