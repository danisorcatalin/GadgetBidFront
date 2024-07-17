import * as Yup from 'yup';
import gtm from '../../../lib/gtm';
import type { FC } from 'react';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { AuthContextValue } from 'contexts/JWTContext';
import { Box, Button, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { GTM_EVENTS } from '../../../constants';
import { GadgetInput } from 'ui/gadget/GadgetInput';
import { Spacer } from 'components/Spacer';

const LoginJWT: FC = (props) => {
  const isMountedRef = useIsMountedRef();
  const { login } = useAuth() as AuthContextValue;
  const { t } = useTranslation();

  const loginEventClick = (): void => {
    gtm.push({ event: GTM_EVENTS.LOGIN_CLICK });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email(t('validations.validEmail'))
          .max(255)
          .required(t('validations.requiredEmail')),
        password: Yup.string().max(255).required(t('validations.requiredPassword')),
      })}
      onSubmit={async (
        { email, password },
        { setErrors, setStatus, setSubmitting }
      ): Promise<void> => {
        try {
          await login({ email, password });

          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          if (isMountedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.response.data.message });
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
      }): JSX.Element => (
        <form noValidate onSubmit={handleSubmit} {...props}>
          <GadgetInput
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            label={t('login.labels.email')}
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
          />
          <Spacer marginTop="30px" />
          <GadgetInput
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            label={t('login.labels.password')}
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
          />
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{JSON.stringify(errors.submit)}</FormHelperText>
            </Box>
          )}
          <Spacer marginTop="32px" />
          <Box sx={{ mt: 2 }}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth={true}
              type="submit"
              variant="contained"
              onClick={loginEventClick}
            >
              {t('login.login')}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginJWT;
