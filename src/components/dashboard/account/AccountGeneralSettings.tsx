import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { Box, Button, Card, CardContent, CardHeader, FormHelperText, Grid } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import wait from '../../../utils/wait';
import { useTranslation } from 'react-i18next';
import { useGetUserById } from 'api';
import gtm from '../../../lib/gtm';
import { GTM_EVENTS } from '../../../constants';
import { GadgetInput } from 'ui/gadget/GadgetInput';

const AccountGeneralSettings: FC = (props) => {
  const { user } = useAuth();
  const { data: userData } = useGetUserById(user.id);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const saveEventClick = (): void => {
    gtm.push({ event: GTM_EVENTS.SETTINGS_GENERAL_SAVE_CHANGES_CLICK });
  };

  return (
    <Grid container spacing={3} {...props}>
      <Grid item xs={12}>
        <Formik
          enableReinitialize
          initialValues={{
            address: userData.address || '',
            country: userData.country || '',
            email: userData.email || '',
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            phone: userData.phone || '',
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            canHire: Yup.bool(),
            city: Yup.string().max(255),
            country: Yup.string().max(255),
            email: Yup.string()
              .email(t('validations.validEmail'))
              .max(255)
              .required(t('validations.requiredEmail')),
            isPublic: Yup.bool(),
            firstName: Yup.string().max(255).required(t('validations.requiredFirstName')),
            lastName: Yup.string().max(255).required(t('validations.requiredLastName')),
            phone: Yup.string(),
            state: Yup.string(),
          })}
          onSubmit={async (
            values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ): Promise<void> => {
            try {
              // NOTE: Make API request
              await wait(200);
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              enqueueSnackbar(t('settings.profileUpdated'), {
                anchorOrigin: {
                  horizontal: 'right',
                  vertical: 'top',
                },
                variant: 'success',
              });
            } catch (err) {
              console.error(err);
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
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader title={t('general.profile')} />
                <CardContent sx={{ backgroundColor: '#fff' }}>
                  <Grid container spacing={4}>
                    <Grid item md={6} xs={12}>
                      <GadgetInput
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}
                        label={t('register.labels.firstName')}
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        disabled={true}
                        formVariant={true}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <GadgetInput
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        label={t('register.labels.lastName')}
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        disabled={true}
                        formVariant={true}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <GadgetInput
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={
                          touched.email && errors.email
                            ? errors.email
                            : t('settings.labels.contactEmail')
                        }
                        label={t('register.labels.email')}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                        disabled={true}
                        formVariant={true}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <GadgetInput
                        error={Boolean(touched.phone && errors.phone)}
                        fullWidth
                        helperText={touched.phone && errors.phone}
                        label={t('register.labels.phoneNumber')}
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phone}
                        // placeholder="+40 720 123 456"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <GadgetInput
                        error={Boolean(touched.country && errors.country)}
                        fullWidth
                        helperText={touched.country && errors.country}
                        label={t('settings.labels.country')}
                        name="country"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.country}
                        disabled={true}
                        formVariant={true}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <GadgetInput
                        error={Boolean(touched.address && errors.address)}
                        fullWidth
                        helperText={touched.address && errors.address}
                        label={t('settings.labels.address')}
                        name="address"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address}
                        disabled={true}
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
                    fullWidth={true}
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    onClick={saveEventClick}
                  >
                    {t('settings.labels.saveChanges')}
                  </Button>
                </Box>
              </Card>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default AccountGeneralSettings;
