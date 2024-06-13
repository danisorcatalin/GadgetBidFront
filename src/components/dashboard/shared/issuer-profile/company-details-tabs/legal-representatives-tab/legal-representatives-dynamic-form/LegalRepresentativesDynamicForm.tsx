import { FC } from 'react';
import * as yup from 'utils/yup-validations';
import {
  DynamicForm,
  DynamicFormInputType,
  DynamicFormInput,
} from 'components/generic/Form/DynamicForm';
import { Company } from 'types/company';
import { useTranslation } from 'react-i18next';

import { CompanyMemberType } from 'types/company';
import { useIssuerProfileContext } from 'hooks/contexts';
import { GTM_EVENTS } from '../../../../../../../constants';

export type LegalRepresentativesInputValues = {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  phone: string;
};

export interface LegalRepresentativesDynamicFormProps {
  companyData: Partial<Company>;
  useAuthHook?: unknown;
  onSubmit?: (values: LegalRepresentativesInputValues[]) => Promise<void>;
  onRemove?: (values: LegalRepresentativesInputValues) => Promise<void>;
}

export const LegalRepresentativesDynamicForm: FC<LegalRepresentativesDynamicFormProps> = (
  props: LegalRepresentativesDynamicFormProps
) => {
  const { companyData = {} } = props;
  const { companyMembers = [] } = companyData;
  const { onLegalRepresentativeSubmit, onLegalRepresentativeRemove } = useIssuerProfileContext();
  const legalRepresentatives = companyMembers.filter(
    (member) => member.role === CompanyMemberType.LEGAL_REPRESENTATIVE
  );
  const { t } = useTranslation();

  const inputs: DynamicFormInput[] = [
    {
      name: 'firstName',
      label: t('legalRepresentatives.form.firstName'),
      validation: yup.firstName,
      type: DynamicFormInputType.TEXT_FIELD,
    },
    {
      name: 'lastName',
      label: t('legalRepresentatives.form.lastName'),
      validation: yup.lastName,
      type: DynamicFormInputType.TEXT_FIELD,
    },
    {
      name: 'address',
      label: t('legalRepresentatives.form.address'),
      validation: yup.address,
      type: DynamicFormInputType.TEXT_FIELD,
    },
    {
      name: 'city',
      label: t('legalRepresentatives.form.city'),
      validation: yup.city,
      type: DynamicFormInputType.TEXT_FIELD,
    },
    {
      name: 'country',
      label: t('legalRepresentatives.form.country'),
      validation: yup.country,
      type: DynamicFormInputType.TEXT_FIELD,
    },
    {
      name: 'phone',
      label: t('legalRepresentatives.form.phone'),
      validation: yup.phone,
      placeholder: '+40 720 123 456',
      type: DynamicFormInputType.TEXT_FIELD,
    },
  ];

  const newInputValues = {
    id: undefined,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    phone: '',
  };

  const initialValues = {
    dynamicInputs: legalRepresentatives.length
      ? legalRepresentatives.map((member) => ({
          id: member?.id,
          firstName: member?.firstName ?? '',
          lastName: member?.lastName ?? '',
          address: member?.address ?? '',
          city: member?.city ?? '',
          country: member?.country ?? '',
          phone: member?.phone ?? '',
        }))
      : [newInputValues],
    submit: false,
  };

  return (
    <DynamicForm<LegalRepresentativesInputValues>
      inputs={inputs}
      initialValues={initialValues}
      newInputValues={newInputValues}
      onSubmit={onLegalRepresentativeSubmit()}
      onRemove={onLegalRepresentativeRemove()}
      enableReinitialize
      submitBtnText={legalRepresentatives.length ? t('general.update') : t('general.save')}
      showAddMoreBtn={!!legalRepresentatives.length}
      showRemoveBtn={!!legalRepresentatives.length}
      submitEventName={
        legalRepresentatives.length
          ? GTM_EVENTS.ISSUER_UPDATE_LEGAL_REPRESENTATIVES_CLICK
          : GTM_EVENTS.ISSUER_SAVE_LEGAL_REPRESENTATIVES_CLICK
      }
    />
  );
};
