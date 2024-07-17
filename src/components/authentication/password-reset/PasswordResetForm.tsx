import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, FormHelperText, TextField } from '@mui/material';
import { useAuth, useQuery } from '../../../hooks';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useTranslation } from 'react-i18next';

const PasswordResetForm: FC = () => {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { updatePassword } = useAuth();
  const query = useQuery();
  const navigate = useNavigate();
  const itemsRef = useRef([]);
  const email = query.get('email');
  const { t } = useTranslation();

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, 6);
  }, []);

  return (
    <Formik
      initialValues={{
        email: email || '',
        password: '',
        passwordConfirmation: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email(t('validations.validEmail'))
          .max(255)
          .required(t('validations.requiredEmail')),
        password: Yup.string()
          .required(t('validations.requiredPassword'))
          .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s]).{8,}$/,
            t('validations.passwordValidation')
          ),
        passwordConfirmation: Yup.string().test(
          'passwords-match',
          'Passwords must match',
          function (value) {
            return this.parent.password === value;
          }
        ),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
        try {
          const token = query.get('token');
          await updatePassword({
            password: values.password,
            passwordConfirmation: values.passwordConfirmation,
            token,
          });
          enqueueSnackbar(t('passwordReset.successfulMessage'), {
            anchorOrigin: {
              horizontal: 'right',
              vertical: 'top',
            },
            variant: 'success',
          });
          navigate('/authentication/login');
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
      }): JSX.Element => (
        <form noValidate onSubmit={handleSubmit}>
          {!email ? (
            <TextField
              autoFocus
              error={Boolean(touched.email && errors.email)}
              fullWidth={true}
              helperText={touched.email && errors.email}
              label={t('register.labels.email')}
              margin="normal"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
              variant="outlined"
            />
          ) : (
            <TextField disabled fullWidth={true} margin="normal" value={email} variant="outlined" />
          )}
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth={true}
            helperText={touched.password && errors.password}
            label={t('settings.labels.newPassword')}
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
            fullWidth={true}
            helperText={touched.passwordConfirmation && errors.passwordConfirmation}
            label={t('settings.labels.newPasswordConfirmation')}
            margin="normal"
            name="passwordConfirmation"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.passwordConfirmation}
            variant="outlined"
          />
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{JSON.stringify(errors.submit)}</FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 3 }}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth={true}
              size="large"
              type="submit"
              variant="contained"
            >
              {t('passwordReset.btn')}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default PasswordResetForm;
