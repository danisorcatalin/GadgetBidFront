import {
  Box,
  Button,
  Container,
  FormHelperText,
  Typography,
  Link,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { FC, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Helmet } from 'react-helmet-async';
import useAuth from 'hooks/useAuth';
import { withErrorSuspense } from 'utils/withErrorSuspense';
import { TwoFactorAuthQrCode } from './shared/TwoFactorAuthQrCode';
import { useTranslation } from 'react-i18next';
import gtm from '../../lib/gtm';
import { GTM_EVENTS } from '../../constants';
import { GadgetInput } from 'ui/gadget/GadgetInput';
import { Link as RouterLink } from 'react-router-dom';
import Logo from 'components/Logo';

const TwoFactorAuth: FC = () => {
  const {
    twoFactorAuth,
    logout,
    user: { twoFactorActivated: twoFactorActivated },
  } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    gtm.push({ event: GTM_EVENTS.PAGE_VIEW, pageTitle: 'Two Factor Auth' });
  }, []);

  const logoutEventClick = (): void => {
    logout();
    gtm.push({ event: GTM_EVENTS.LOGOUT_CLICK });
  };

  const submitEventClick = (): void => {
    gtm.push({ event: GTM_EVENTS.CODE_SUBMIT_CLICK });
  };

  return (
    <>
      <Helmet>
        <title>{t('pages.twoFactorAuthentication')}</title>
      </Helmet>
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
        <Formik
          initialValues={{
            authCode: '',
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            authCode: Yup.string()
              .matches(/^[0-9]+$/, t('validations.onlyDigits'))
              .min(6, t('validations.max6Digits'))
              .max(6, t('validations.max6Digits'))
              .required(t('pages.authCode')),
          })}
          onSubmit={async (
            { authCode },
            { setErrors, setStatus, setSubmitting }
          ): Promise<void> => {
            try {
              await twoFactorAuth({ token: authCode });
              setStatus({ success: true });
              setSubmitting(false);
            } catch (err) {
              console.log(err);
              setStatus({ success: false });
              setErrors({ submit: err.response.data.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }): JSX.Element => (
            <form noValidate onSubmit={handleSubmit}>
              <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <Card sx={{ width: '352px', mt: 8 }}>
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
                      {twoFactorActivated > 0 ? (
                        <Typography
                          sx={{
                            color: '#000000',
                            fontSize: '16.5px !important',
                            letterSpacing: '-0.33px',
                            textAlign: 'left',
                          }}
                          gutterBottom
                        >
                          {t('pages.submitCode')} &apos;{t('pages.gadget')}&apos;.
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            color: '#000000',
                            fontSize: '16.5px !important',
                            letterSpacing: '-0.33px',
                            textAlign: 'left',
                          }}
                          gutterBottom
                        >
                          {t('pages.scanQR')}
                        </Typography>
                      )}
                    </Box>
                    <Box
                      sx={{
                        flexGrow: 1,
                        p: 2,
                      }}
                    >
                      {twoFactorActivated > 0 ? null : <TwoFactorAuthQrCode />}
                      <GadgetInput
                        autoFocus
                        error={Boolean(touched.authCode && errors.authCode)}
                        helperText={touched.authCode && errors.authCode}
                        label={t('pages.code')}
                        name="authCode"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.authCode}
                      />
                      {errors.submit && (
                        <Box sx={{ mt: 1 }}>
                          <FormHelperText error>{JSON.stringify(errors.submit)}</FormHelperText>
                        </Box>
                      )}
                    </Box>
                    <Box
                      sx={{ mt: 2, display: 'flex', flexDirection: 'column', padding: '0px 16px' }}
                    >
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        onClick={submitEventClick}
                        sx={{ fontSize: '22px' }}
                      >
                        {t('pages.signin')}
                      </Button>
                      <Divider
                        variant="middle"
                        sx={{ ml: 0, mr: 0, mt: 3.5, backgroundColor: '#96B7DB' }}
                      />
                      <Link
                        underline="hover"
                        component={RouterLink}
                        sx={{ paddingTop: '30px', marginLeft: '0px', color: '#000000' }}
                        to="/authentication/login"
                        variant="h2"
                        onClick={logoutEventClick}
                      >
                        {t('pages.logout')}
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              </Container>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default withErrorSuspense(TwoFactorAuth);
