import { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  Typography,
  Link,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import DetailedRadioGroup, { IDetailedRadio } from '../../DetailedRadioGroup';
import { useTranslation } from 'react-i18next';
import { useModal } from 'mui-modal-provider';
import TermsModal from 'pages/gdpr/TermsModal';
import { TermsAndConditions } from 'pages/gdpr/TermsAndConditions';
import { PrivacyPolicy } from 'pages/gdpr/PrivacyPolicy';

import { AuthContextValue } from 'contexts/JWTContext';
import { RegisteredUserRole } from 'types/user';
import gtm from '../../../lib/gtm';
import { GTM_EVENTS } from '../../../constants';
import { MembershipAgreement } from 'pages/gdpr/MembershipAgreement';
import { GadgetInput } from 'ui/gadget/GadgetInput';

enum TermsType {
  TermsAndConditions,
  PrivacyPolicy,
  MembershipAgreement,
}

const RegisterJWT: FC = (props) => {
  const isMountedRef = useIsMountedRef();
  const { register } = useAuth() as AuthContextValue;
  const { t } = useTranslation();
  const { showModal } = useModal();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const userRoles: IDetailedRadio[] = [
    {
      value: 'INVESTOR',
      title: t('register.labels.investor'),
      description: t('register.labels.investorDescription'),
    },
    {
      value: 'ISSUER',
      title: t('register.labels.issuer'),
      description: t('register.labels.issuerDescription'),
    },
  ];

  const showTermsAndConditions = (
    type: TermsType,
    setFieldValue: (field: string, value: undefined | boolean) => void
  ) => {
    let component: JSX.Element;
    let title: string;
    let handleAccept: () => void;
    switch (type) {
      case TermsType.TermsAndConditions:
        component = <TermsAndConditions />;
        title = t('register.labels.terms');
        handleAccept = () => {
          setFieldValue('termsAndCondition', true);
        };
        break;
      case TermsType.PrivacyPolicy:
        component = <PrivacyPolicy />;
        title = t('register.labels.privacyPolicy');
        handleAccept = () => {
          setFieldValue('privacyPolicy', true);
        };
        break;
      case TermsType.MembershipAgreement:
        component = <MembershipAgreement />;
        title = t('register.labels.membershipAgreement');
        handleAccept = () => {
          setFieldValue('membershipAgreement', true);
        };
        break;
      default:
        break;
    }

    showModal(TermsModal, { childComponent: component, title: title, handleAccept: handleAccept });
  };

  const registerEventClick = (): void => {
    gtm.push({ event: GTM_EVENTS.REGISTER_CLICK });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        passwordConfirmation: '',
        role: '' as RegisteredUserRole,
        termsAndCondition: false,
        privacyPolicy: false,
        membershipAgreement: false,
        marketingConsent: false,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        role: Yup.mixed().oneOf(['INVESTOR', 'ISSUER']).required(t('validations.selectOne')),
        email: Yup.string()
          .email(t('validations.validEmail'))
          .max(255)
          .required(t('validations.requiredEmail')),
        firstName: Yup.string().max(255).required(t('validations.requiredFirstName')),
        lastName: Yup.string().max(255).required(t('validations.requiredLastName')),
        phone: Yup.string()
          .matches(
            /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
            t('validations.validPhone')
          )
          .required(t('validations.requiredPhone')),
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
        termsAndCondition: Yup.boolean().oneOf([true], t('validations.checkedField')),
        privacyPolicy: Yup.boolean().oneOf([true], t('validations.checkedField')),
        membershipAgreement: Yup.boolean().oneOf([true], t('validations.checkedField')),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
        try {
          await register(values);
          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err });
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
        setFieldValue,
      }): JSX.Element => (
        <form noValidate onSubmit={handleSubmit} {...props}>
          <DetailedRadioGroup
            mobileDevice={mobileDevice}
            radios={userRoles}
            name="role"
            error={Boolean(touched.role && errors.role)}
            errorText={touched.role && errors.role}
            fullWidth={true}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Grid container spacing={2}>
            <Grid sx={{ mb: 1.5 }} item xs={12} sm={6}>
              <GadgetInput
                error={Boolean(touched.firstName && errors.firstName)}
                fullWidth={true}
                helperText={touched.firstName && errors.firstName}
                label={t('register.labels.firstName')}
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <GadgetInput
                error={Boolean(touched.lastName && errors.lastName)}
                fullWidth
                helperText={touched.lastName && errors.lastName}
                label={t('register.labels.lastName')}
                name="lastName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
              />
            </Grid>
            <Grid sx={{ mb: 1.5 }} item xs={12} sm={6}>
              <GadgetInput
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label={t('register.labels.email')}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <GadgetInput
                error={Boolean(touched.phone && errors.phone)}
                fullWidth
                helperText={touched.phone && errors.phone}
                label={t('register.labels.phoneNumber')}
                name="phone"
                onBlur={handleBlur}
                onChange={handleChange}
                type="phone"
                value={values.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <GadgetInput
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label={t('register.labels.password')}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <GadgetInput
                error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
                fullWidth
                helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                label={t('register.labels.passwordConfirmation')}
                name="passwordConfirmation"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.passwordConfirmation}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              mt: 2,
            }}
          >
            <Checkbox
              checked={values.termsAndCondition}
              color="primary"
              name="termsAndCondition"
              onChange={handleChange}
            />
            <Typography sx={{ color: '#000000' }} variant="body2">
              {t('register.labels.iAcceptThe')}
              <Link
                underline="always"
                sx={{ color: '#000000' }}
                component="button"
                type="button"
                onClick={() => showTermsAndConditions(TermsType.TermsAndConditions, setFieldValue)}
              >
                {t('register.labels.terms')}
              </Link>
            </Typography>
          </Box>
          {Boolean(touched.termsAndCondition && errors.termsAndCondition) && (
            <FormHelperText error>{errors.termsAndCondition}</FormHelperText>
          )}
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              mt: 2,
            }}
          >
            <Checkbox
              checked={values.privacyPolicy}
              color="primary"
              name="privacyPolicy"
              onChange={handleChange}
            />
            <Typography sx={{ color: '#000000' }} variant="body2">
              {t('register.labels.iAcceptThe')}
              <Link
                underline="always"
                sx={{ color: '#000000' }}
                component="button"
                type="button"
                onClick={() => showTermsAndConditions(TermsType.PrivacyPolicy, setFieldValue)}
              >
                {t('register.labels.privacyPolicy')}
              </Link>
            </Typography>
          </Box>
          {Boolean(touched.privacyPolicy && errors.privacyPolicy) && (
            <FormHelperText error>{errors.privacyPolicy}</FormHelperText>
          )}
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              mt: 2,
            }}
          >
            <Checkbox
              checked={values.membershipAgreement}
              color="primary"
              name="membershipAgreement"
              onChange={handleChange}
            />
            <Typography sx={{ color: '#000000' }} variant="body2">
              {t('register.labels.iAcceptThe')}
              <Link
                underline="always"
                sx={{ color: '#000000' }}
                component="button"
                type="button"
                onClick={() => showTermsAndConditions(TermsType.MembershipAgreement, setFieldValue)}
              >
                {t('register.labels.membershipAgreement')}
              </Link>
            </Typography>
          </Box>
          {Boolean(touched.membershipAgreement && errors.membershipAgreement) && (
            <FormHelperText error>{errors.membershipAgreement}</FormHelperText>
          )}
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              textAlign: 'justify',
              mt: 2,
            }}
          >
            <Typography sx={{ color: '#000000' }} variant="body2">
              {t('register.marketingConsentOne')}{' '}
              <Link
                underline="always"
                sx={{ color: '#000000' }}
                component="button"
                type="button"
                onClick={() => showTermsAndConditions(TermsType.PrivacyPolicy, setFieldValue)}
              >
                {t('register.marketingConsentTwo')}
              </Link>{' '}
              {t('register.marketingConsentThree')}
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              textAlign: 'justify',
              mt: 2,
            }}
          >
            <Checkbox
              checked={values.marketingConsent}
              color="primary"
              name="marketingConsent"
              onChange={handleChange}
              sx={{ '&.MuiCheckbox-root input': { width: '32px', height: '32px' } }}
            />
            <Typography
              sx={{ color: '#000000', paddingLeft: mobileDevice ? '8px' : '5px' }}
              variant="body2"
            >
              {t('register.marketingConsent')}
            </Typography>
          </Box>
          {Boolean(touched.marketingConsent && errors.marketingConsent) && (
            <FormHelperText error>{errors.marketingConsent}</FormHelperText>
          )}
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 4 }}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={registerEventClick}
              sx={{ fontSize: '22px' }}
            >
              {t('register.labels.register')}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default RegisterJWT;
