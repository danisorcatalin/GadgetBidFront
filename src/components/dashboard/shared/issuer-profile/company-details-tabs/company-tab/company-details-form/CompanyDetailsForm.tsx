import * as yup from 'utils/yup-validations';
import { Form, FormInputType, FormInput } from 'components/generic/Form';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';
import type { Company } from 'types/company';
import { useIssuerProfileContext } from 'hooks/contexts';
import { GTM_EVENTS } from '../../../../../../../constants';

export type CompanyDetailsFormInputs = {
  name: string;
  cui: string;
  fui: string;
  website: string;
  euid: string;
  bankName: string;
  iban: string;
  address: string;
  city: string;
  country: string;
  legalForm: string;
  submit: boolean;
};

export interface CompanyDetailsFormProps {
  companyData: Partial<Company>;
  onSubmit?: (values: CompanyDetailsFormInputs) => Promise<void>;
  useAuthHook?: unknown;
}

export const CompanyDetailsForm: FC<CompanyDetailsFormProps> = (props: CompanyDetailsFormProps) => {
  const { companyData = {} } = props;
  const { onCompanyDetailsSubmit } = useIssuerProfileContext();
  const { t } = useTranslation();

  const inputs: FormInput[] = [
    {
      name: 'name',
      label: t('company.detailsForm.companyName'),
      validation: yup.companyName,
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'cui',
      label: t('company.detailsForm.registrationNumber'),
      validation: yup.registrationNumber,
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'fui',
      label: t('company.detailsForm.fiscalIdentificationNumber'),
      validation: yup.fiscalIdentificationNumber,
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'euid',
      label: t('company.detailsForm.euRegistrationNumber'),
      validation: yup.euRegistrationNumber,
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'website',
      label: t('company.detailsForm.website'),
      validation: yup.website,
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'bankName',
      label: t('company.detailsForm.bankName'),
      validation: yup.bankName,
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'iban',
      label: t('company.detailsForm.iban'),
      validation: yup.iban,
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'address',
      label: t('company.detailsForm.address'),
      validation: yup.address,
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'city',
      label: t('company.detailsForm.city'),
      validation: yup.city,
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'country',
      label: t('company.detailsForm.country'),
      validation: yup.country,
      type: FormInputType.TEXT_FIELD,
    },
    {
      name: 'legalForm',
      label: t('company.detailsForm.legalForm'),
      validation: yup.legalForm,
      type: FormInputType.TEXT_FIELD,
    },
  ];

  const initialValues: CompanyDetailsFormInputs = {
    name: companyData?.name ?? '',
    cui: companyData?.cui ?? '',
    fui: companyData?.fui ?? '',
    euid: companyData?.euid ?? '',
    website: companyData?.website ?? '',
    bankName: companyData?.bankName ?? '',
    iban: companyData?.iban ?? '',
    address: companyData?.address ?? '',
    city: companyData?.city ?? '',
    country: companyData?.country ?? '',
    legalForm: companyData?.legalForm ?? '',
    submit: false,
  };

  return (
    <Form<CompanyDetailsFormInputs>
      inputs={inputs}
      initialValues={initialValues}
      onSubmit={onCompanyDetailsSubmit()}
      submitBtnText={companyData.id ? t('general.update') : t('general.save')}
      enableReinitialize
      submitEventName={
        companyData.id
          ? GTM_EVENTS.ISSUER_UPDATE_COMPANY_CLICK
          : GTM_EVENTS.ISSUER_SAVE_COMPANY_CLICK
      }
    />
  );
};
