import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, FormHelperText } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useTranslation } from 'react-i18next';
import gtm from '../../../lib/gtm';
import { GTM_EVENTS } from '../../../constants';
import { GadgetInput } from 'ui/gadget/GadgetInput';

const PasswordRecoveryForm: FC = () => {
  const isMountedRef = useIsMountedRef();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const passwordRecoveryEventClick = (): void => {
    gtm.push({ event: GTM_EVENTS.RECOVER_PASSWORD_CLICK });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email(t('validations.validEmail'))
          .max(255)
          .required(t('validations.requiredEmail')),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
        try {
          await resetPassword({ email: values.email });
          enqueueSnackbar(t('passwordRecovery.emailSent'), {
            anchorOrigin: {
              horizontal: 'right',
              vertical: 'top',
            },
            variant: 'success',
          });
          navigate('/authentication/password-recovery-link-sent');
          // setStatus({ success: true });
        } catch (err) {
          console.error(err);
          if (isMountedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
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
        status,
      }): JSX.Element => (
        <form noValidate onSubmit={handleSubmit}>
          <GadgetInput
            error={Boolean(touched.email && errors.email)}
            fullWidth={true}
            helperText={touched.email && errors.email}
            label={t('register.labels.email')}
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
          />
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 3 }}>
            <Button
              sx={{ fontSize: '22px' }}
              color="primary"
              disabled={isSubmitting || status?.success}
              fullWidth={true}
              size="large"
              type="submit"
              variant="contained"
              onClick={passwordRecoveryEventClick}
            >
              {t('passwordRecovery.btn')}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default PasswordRecoveryForm;
