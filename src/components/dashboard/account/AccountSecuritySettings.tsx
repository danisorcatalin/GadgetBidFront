import { FC, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { Box, Button, Card, CardContent, CardHeader, FormHelperText, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'hooks';
import { Spacer } from 'components/Spacer';
import { TwoFactorAuthQrCode } from 'pages/authentication/shared/TwoFactorAuthQrCode';
import gtm from '../../../lib/gtm';
import { GTM_EVENTS } from '../../../constants';
import { GadgetInput } from 'ui/gadget/GadgetInput';

const AccountSecuritySettings: FC = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { updateUserPassword, twoFactorAuth } = useAuth();
  const { t } = useTranslation();
  const [showQrCode, setShowQrCode] = useState<boolean>(false);

  const changePasswordEventClick = (): void => {
    gtm.push({ event: GTM_EVENTS.SETTINGS_CHANGE_PASSWORD_CLICK });
  };

  const generateQRCodeEventClick = (show: boolean): void => {
    setShowQrCode(show);
    gtm.push({ event: GTM_EVENTS.SETTINGS_SECURITY_GENERATE_QR_CODE_CLICK });
  };

  return (
    <>
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          newPasswordConfirmation: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          currentPassword: Yup.string()
            .matches(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s]).{8,}$/,
              t('validations.passwordValidation')
            )
            .max(255)
            .required(t('validations.required')),
          newPassword: Yup.string()
            .matches(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s]).{8,}$/,
              t('validations.passwordValidation')
            )
            .max(255)
            .required(t('validations.required')),
          newPasswordConfirmation: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], t('validations.passwordsMustMatch'))
            .required(t('validations.required')),
        })}
        onSubmit={async (
          values,
          { resetForm, setErrors, setStatus, setSubmitting }
        ): Promise<void> => {
          try {
            // NOTE: Make API request
            await updateUserPassword({ ...values });
            resetForm();
            setStatus({ success: true });
            setSubmitting(false);
            enqueueSnackbar(t('settings.labels.passwordUpdated'), {
              anchorOrigin: {
                horizontal: 'right',
                vertical: 'top',
              },
              variant: 'success',
            });
          } catch (err) {
            console.error(err);
            console.log(err.response);
            setStatus({ success: false });
            setErrors({ submit: err.message });
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
          <form onSubmit={handleSubmit} {...props}>
            <Card>
              <CardHeader title={t('settings.labels.changePassword')} />
              <CardContent sx={{ backgroundColor: '#fff' }}>
                <Grid container spacing={3}>
                  <Grid item md={4} sm={6} xs={12}>
                    <GadgetInput
                      error={Boolean(touched.currentPassword && errors.currentPassword)}
                      helperText={touched.currentPassword && errors.currentPassword}
                      label={t('settings.labels.currentPassword')}
                      name="currentPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.currentPassword}
                      formVariant={true}
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <GadgetInput
                      error={Boolean(touched.newPassword && errors.newPassword)}
                      helperText={touched.newPassword && errors.newPassword}
                      label={t('settings.labels.newPassword')}
                      name="newPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.newPassword}
                      formVariant={true}
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <GadgetInput
                      error={Boolean(
                        touched.newPasswordConfirmation && errors.newPasswordConfirmation
                      )}
                      helperText={touched.newPasswordConfirmation && errors.newPasswordConfirmation}
                      label={t('settings.labels.newPasswordConfirmation')}
                      name="newPasswordConfirmation"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.newPasswordConfirmation}
                      formVariant={true}
                    />
                  </Grid>
                </Grid>
                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 2,
                }}
              >
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  fullWidth
                  onClick={changePasswordEventClick}
                >
                  {t('settings.labels.changePassword')}
                </Button>
              </Box>
            </Card>
          </form>
        )}
      </Formik>
      <Spacer marginTop="16px" marginBottom="16px" />
      <Card>
        <CardHeader title={t('pages.rescan')} />
        <CardContent sx={{ backgroundColor: '#fff' }}>
          {!showQrCode ? (
            <Button
              color="primary"
              onClick={() => generateQRCodeEventClick(true)}
              sx={{ mt: 1 }}
              variant="contained"
              fullWidth
            >
              {t('pages.showQrCode')}
            </Button>
          ) : (
            <>
              <TwoFactorAuthQrCode />
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
                    setShowQrCode(false);
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
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <GadgetInput
                        autoFocus
                        formVariant={true}
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
                          <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                      )}
                    </Box>
                    <Box
                      sx={{ mt: 4, display: 'flex', flexDirection: 'column', padding: '0px 16px' }}
                    >
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        sx={{ fontSize: '22px' }}
                      >
                        {t('pages.submitNewAuthCode')}
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default AccountSecuritySettings;
