import { FC } from 'react';
import * as yup from 'utils/yup-validations';
import { FormInputType, FormInput } from 'components/generic/Form/Form';

import { UserOutputSingleDto } from 'types/user';
import { Form } from 'components/generic/Form';
import { useTranslation } from 'react-i18next';
import { GTM_EVENTS } from '../../../../../../../constants';

export type InvestorDetailsFormInputValues = {
  id?: number;
  firstName: string;
  lastName: string;
  personalNumber: string;
  idCardNumber: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  // bankName: string;
  // iban: string;
  submit: boolean;
};

export interface InvestorDetailsFormProps {
  userData: Partial<UserOutputSingleDto>;
  useAuthHook?: unknown;
  onSubmit?: (values: InvestorDetailsFormInputValues) => Promise<void>;
}
export const InvestorDetailsForm: FC<InvestorDetailsFormProps> = (
  props: InvestorDetailsFormProps
) => {
  const { userData, onSubmit = async () => {} } = props;
  const { t } = useTranslation();
  const inputs: FormInput[] = [
    {
      name: 'firstName',
      label: t('inputs.firstName'),
      validation: yup.firstName,
      type: FormInputType.TEXT_FIELD,
      disabled: userData.kycCompleted,
    },
    {
      name: 'lastName',
      label: t('inputs.lastName'),
      validation: yup.lastName,
      type: FormInputType.TEXT_FIELD,
      disabled: userData.kycCompleted,
    },
    {
      name: 'email',
      label: t('inputs.email'),
      validation: yup.email,
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'phone',
      label: t('inputs.phone'),
      validation: yup.phone,
      type: FormInputType.TEXT_FIELD,
      placeholder: '+40 720 123 456',
    },
    {
      name: 'personalNumber',
      label: t('inputs.personalNumber'),
      type: FormInputType.TEXT_FIELD,
      disabled: true,
    },
    {
      name: 'idCardNumber',
      label: t('inputs.idCardNumber'),
      type: FormInputType.TEXT_FIELD,
      disabled: true,
    },
    {
      name: 'dateOfBirth',
      label: t('inputs.dateOfBirth'),
      type: FormInputType.TEXT_FIELD,
      disabled: true,
    },
    // {
    //   name: 'bankName',
    //   label: t('inputs.bankName'),
    //   type: FormInputType.TEXT_FIELD,
    //   disabled: true,
    // },
    // {
    //   name: 'iban',
    //   label: t('inputs.iban'),
    //   type: FormInputType.TEXT_FIELD,
    //   disabled: true,
    // },
  ];

  const initialValues: InvestorDetailsFormInputValues = {
    firstName: userData?.firstName ?? '',
    lastName: userData?.lastName ?? '',
    personalNumber: userData?.personalNumber ?? '',
    idCardNumber: userData?.cardNumber ?? '',
    dateOfBirth: userData?.dateOfBirth ?? '',
    email: userData?.email ?? '',
    phone: userData?.phone ?? '',
    // bankName: userData?.companies[0]?.bankName ?? '',
    // iban: userData?.companies[0]?.iban ?? '',
    submit: false,
  };

  return (
    <Form<InvestorDetailsFormInputValues>
      inputs={inputs}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitBtnText={userData ? t('general.update') : t('general.save')}
      enableReinitialize
      submitEventName={
        userData
          ? GTM_EVENTS.INVESTOR_UPDATE_GENERAL_INFORMATION_CLICK
          : GTM_EVENTS.INVESTOR_SAVE_GENERAL_INFORMATION_CLICK
      }
    />
  );
};
