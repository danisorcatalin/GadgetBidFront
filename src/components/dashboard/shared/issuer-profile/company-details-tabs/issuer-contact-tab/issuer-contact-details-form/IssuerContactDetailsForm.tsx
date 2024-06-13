import * as yup from 'utils/yup-validations';
import type { FC } from 'react';
import { Form, FormInputType, FormInput } from 'components/generic/Form';
import { UserOutputSingleDto } from 'types/user';
import { useIssuerProfileContext } from 'hooks/contexts';
import { useTranslation } from 'react-i18next';
import { GTM_EVENTS } from '../../../../../../../constants';

export type IssuerContactDetailsFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  submit: boolean;
};

export interface IssuerContactDetailsFormProps {
  userData: Partial<UserOutputSingleDto>;
  onSubmit?: (values: IssuerContactDetailsFormInputs) => Promise<void>;
  useAuthHook?: unknown;
}

export const IssuerContactDetailsForm: FC<IssuerContactDetailsFormProps> = (
  props: IssuerContactDetailsFormProps
) => {
  const { userData = {} } = props;
  const { onIssuerDetailsSubmit } = useIssuerProfileContext();
  const { t } = useTranslation();

  const inputs: FormInput[] = [
    {
      name: 'firstName',
      label: t('campaign.table.firstName'),
      validation: yup.firstName,
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'lastName',
      label: t('campaign.table.lastName'),
      validation: yup.lastName,
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'email',
      label: t('campaign.table.email'),
      validation: yup.email,
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'phone',
      label: t('campaign.table.phone'),
      validation: yup.phone,
      type: FormInputType.TEXT_FIELD,
      placeholder: '+40 720 123 456',
    },
  ];

  const initialValues: IssuerContactDetailsFormInputs = {
    firstName: userData?.firstName ?? '',
    lastName: userData?.lastName ?? '',
    email: userData?.email ?? '',
    phone: userData?.phone ?? '',
    submit: false,
  };

  return (
    <Form<IssuerContactDetailsFormInputs>
      inputs={inputs}
      initialValues={initialValues}
      onSubmit={onIssuerDetailsSubmit()}
      submitBtnText={t('general.update')}
      enableReinitialize
      submitEventName={GTM_EVENTS.ISSUER_UPDATE_CONTACT_DETAILS_CLICK}
    />
  );
};
