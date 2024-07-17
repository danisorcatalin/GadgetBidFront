import Logo from '../../components/Logo';
import gtm from '../../lib/gtm';
import type { FC } from 'react';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { GTM_EVENTS } from '../../constants';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { PasswordRecoveryForm } from '../../components/authentication/password-recovery';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PasswordRecovery: FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Password Recovery' });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('passwordRecovery.pageTitle')} | Gadget Bid</title>
      </Helmet>
      <Box sx={{ minHeight: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <RouterLink to="dashboard">
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
          <Container maxWidth="sm" sx={{ py: 10 }}>
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
                  backgroundColor: '#F4F6FF',
                  p: 0,
                }}
              >
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 3,
                    backgroundColor: 'background.paper',
                    p: 2,
                  }}
                >
                  <div>
                    <Typography sx={{ color: '#000000' }} gutterBottom variant="h1">
                      {t('passwordRecovery.pageTitle')}
                    </Typography>
                    <Typography sx={{ color: '#000000' }}>
                      {t('passwordRecovery.subtitle')}
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
                    px: 2,
                    mb: 1,
                  }}
                >
                  <PasswordRecoveryForm />
                </Box>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default PasswordRecovery;
